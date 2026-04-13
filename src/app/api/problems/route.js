import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { addPoints } from "@/lib/gamification";

// ✅ GET: Dynamic Feed + Search + Filter + Pagination + Personalization
export async function GET(req) {
  try {
    const user = await currentUser();

    const { searchParams } = new URL(req.url);

    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const difficulty = searchParams.get("difficulty") || "";
    const status = searchParams.get("status") || "";
    const sort = searchParams.get("sort") || "latest";

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 6;
    const offset = (page - 1) * limit;

    let baseQuery = `
      SELECT p.*, u.name as user_name, u.image as user_image
      FROM problems p
      JOIN users u ON p.user_id = u.id
      WHERE 1=1
    `;

    let countQuery = `
      SELECT COUNT(*) FROM problems p WHERE 1=1
    `;

    let values = [];
    let i = 1;

    // 🔍 Search
    if (search) {
      baseQuery += ` AND p.title ILIKE $${i}`;
      countQuery += ` AND p.title ILIKE $${i}`;
      values.push(`%${search}%`);
      i++;
    }

    // 📂 Category
    if (category) {
      baseQuery += ` AND p.category = $${i}`;
      countQuery += ` AND p.category = $${i}`;
      values.push(category);
      i++;
    }

    // 🎯 Difficulty
    if (difficulty) {
      baseQuery += ` AND p.difficulty = $${i}`;
      countQuery += ` AND p.difficulty = $${i}`;
      values.push(difficulty);
      i++;
    }

    // 📌 Status
    if (status) {
      baseQuery += ` AND p.status = $${i}`;
      countQuery += ` AND p.status = $${i}`;
      values.push(status);
      i++;
    }

    // 🔥 SORTING LOGIC
    if (sort === "trending") {
      baseQuery = `
        SELECT p.*, u.name as user_name, u.image as user_image,
        COUNT(s.id) as solution_count
        FROM problems p
        LEFT JOIN solutions s ON p.id = s.problem_id
        JOIN users u ON p.user_id = u.id
        GROUP BY p.id, u.name, u.image
        ORDER BY solution_count DESC
        LIMIT $${i} OFFSET $${i + 1}
      `;

      values.push(limit, offset);

      const res = await query(baseQuery, values);

      return NextResponse.json({
        success: true,
        page,
        limit,
        data: res.rows,
      });
    }

    // 🔥 PERSONALIZED SORT
    if (user) {
      baseQuery += `
        ORDER BY 
        CASE WHEN u.clerk_id = $${i} THEN 0 ELSE 1 END,
        p.created_at DESC
      `;
      values.push(user.id);
      i++;
    } else {
      baseQuery += ` ORDER BY p.created_at DESC`;
    }

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
      constraints,
      expected_outcomes,
      requirements,
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
      (user_id, title, description, category, tags, difficulty, status, reward, deadline, constraints, expected_outcomes, requirements)
      VALUES ($1, $2, $3, $4, $5, $6, 'open', $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        dbUser.id,
        title,
        description || "",
        category,
        tags || [],
        difficulty || "easy",
        reward || null,
        deadline || null,
        constraints || null,
        expected_outcomes || null,
        requirements || null,
      ]
    );

    // 🎯 ADD POINTS
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