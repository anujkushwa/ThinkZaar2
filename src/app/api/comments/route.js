import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

// ✅ GET comments (threaded)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const solutionId = searchParams.get("solutionId");

    if (!solutionId) {
      return NextResponse.json(
        { success: false, message: "solutionId required" },
        { status: 400 }
      );
    }

    const res = await query(
      `SELECT c.*, u.name, u.image
       FROM comments c
       JOIN users u ON c.user_id = u.id
       WHERE c.solution_id = $1
       ORDER BY c.created_at ASC`,
      [solutionId]
    );

    // 🔥 Convert flat → tree
    const comments = res.rows;

    const map = {};
    const tree = [];

    comments.forEach((c) => {
      c.replies = [];
      map[c.id] = c;
    });

    comments.forEach((c) => {
      if (c.parent_id) {
        map[c.parent_id]?.replies.push(c);
      } else {
        tree.push(c);
      }
    });

    return NextResponse.json({
      success: true,
      data: tree,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// ✅ ADD COMMENT / REPLY
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
    const { solutionId, content, parentId } = body;

    if (!solutionId || !content) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }

    // 🔥 Get DB user
    const userRes = await query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    const dbUser = userRes.rows[0];

    const res = await query(
      `INSERT INTO comments (solution_id, user_id, content, parent_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [solutionId, dbUser.id, content, parentId || null]
    );

    return NextResponse.json({
      success: true,
      message: "Comment added",
      data: res.rows[0],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to add comment" },
      { status: 500 }
    );
  }
}