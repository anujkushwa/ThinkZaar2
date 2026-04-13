import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { addPoints } from "@/lib/gamification";

// ✅ GET solutions by problem_id
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const problemId = searchParams.get("problemId");

    if (!problemId) {
      return NextResponse.json(
        { success: false, message: "problemId required" },
        { status: 400 }
      );
    }

    const res = await query(
      `SELECT s.*, u.name, u.image
       FROM solutions s
       JOIN users u ON s.user_id = u.id
       WHERE s.problem_id = $1
       ORDER BY s.created_at DESC`,
      [problemId]
    );

    return NextResponse.json({
      success: true,
      total: res.rows.length,
      data: res.rows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch solutions" },
      { status: 500 }
    );
  }
}

// ✅ SUBMIT SOLUTION
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
    const { problemId, content, fileUrl, externalLink } = body;

    if (!problemId || !content) {
      return NextResponse.json(
        { success: false, message: "Problem & content required" },
        { status: 400 }
      );
    }

    // 🔥 Get DB user
    const userRes = await query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    const dbUser = userRes.rows[0];

    if (!dbUser) {
      return NextResponse.json(
        { success: false, message: "User not found in DB" },
        { status: 404 }
      );
    }

    // 🔥 Check existing solution for versioning
    const existing = await query(
      `SELECT * FROM solutions 
       WHERE user_id = $1 AND problem_id = $2 
       ORDER BY version DESC LIMIT 1`,
      [dbUser.id, problemId]
    );

    let version = 1;

    if (existing.rows.length > 0) {
      version = existing.rows[0].version + 1;
    }

    // 🔥 Insert solution
    await addPoints(dbUser.id, 10, "solution_submitted");
    const res = await query(
      `INSERT INTO solutions 
      (problem_id, user_id, content, file_url, external_link, version)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        problemId,
        dbUser.id,
        content,
        fileUrl || null,
        externalLink || null,
        version,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Solution submitted",
      data: res.rows[0],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to submit solution" },
      { status: 500 }
    );
  }
}