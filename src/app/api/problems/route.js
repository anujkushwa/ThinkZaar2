import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { addPoints } from "@/lib/gamification";

// ✅ GET: Search + Filter + Pagination
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const difficulty = searchParams.get("difficulty") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;

    const offset = (page - 1) * limit;

    let baseQuery = `SELECT * FROM problems WHERE 1=1`;
    let countQuery = `SELECT COUNT(*) FROM problems WHERE 1=1`;
    let values = [];
    let i = 1;

    // 🔍 Search (title)
    if (search) {
      baseQuery += ` AND title ILIKE $${i}`;
      countQuery += ` AND title ILIKE $${i}`;
      values.push(`%${search}%`);
      i++;
    }

    // 📂 Category filter
    if (category) {
      baseQuery += ` AND category = $${i}`;
      countQuery += ` AND category = $${i}`;
      values.push(category);
      i++;
    }

    // 🎯 Difficulty filter
    if (difficulty) {
      baseQuery += ` AND difficulty = $${i}`;
      countQuery += ` AND difficulty = $${i}`;
      values.push(difficulty);
      i++;
    }

    // 📌 Status filter
    if (status) {
      baseQuery += ` AND status = $${i}`;
      countQuery += ` AND status = $${i}`;
      values.push(status);
      i++;
    }

    // 📊 Sorting
    baseQuery += ` ORDER BY created_at DESC`;

    // 📄 Pagination
    baseQuery += ` LIMIT $${i} OFFSET $${i + 1}`;
    values.push(limit, offset);

    const dataRes = await query(baseQuery, values);
    const countRes = await query(countQuery, values.slice(0, i - 1));

    return NextResponse.json({
      success: true,
      total: parseInt(countRes.rows[0].count),
      page,
      limit,
      data: dataRes.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch problems" },
      { status: 500 }
    );
  }
}

// ✅ POST: Create Problem + Points
export async function POST(req) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      title,
      description,
      category,
      tags,
      difficulty,
      reward,
      deadline,
    } = body;

    if (!title || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and category are required",
        },
        { status: 400 }
      );
    }

    // 🔥 Get DB user
    let userRes = await query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    let dbUser = userRes.rows[0];

    if (!dbUser) {
      const newUser = await query(
        `INSERT INTO users (clerk_id, name, email, image)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [
          user.id,
          user.fullName || "User",
          user.emailAddresses[0]?.emailAddress,
          user.imageUrl,
        ]
      );
      dbUser = newUser.rows[0];
    }

    // 🔥 Insert Problem
    const problemRes = await query(
      `INSERT INTO problems
      (user_id, title, description, category, tags, difficulty, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'open')
      RETURNING *`,
      [
        dbUser.id,
        title,
        description || "",
        category,
        tags || [],
        difficulty || "easy",
      ]
    );

    // 🎯 ADD POINTS (+5 for creating problem)
    await addPoints(dbUser.id, 5, "problem_created");

    return NextResponse.json({
      success: true,
      message: "Problem created successfully",
      data: problemRes.rows[0],
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to create problem" },
      { status: 500 }
    );
  }
}