import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

// ✅ UPDATE (new version)
export async function PUT(req, { params }) {
  try {
    const user = await currentUser();
    const { id } = params;

    if (!user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const body = await req.json();
    const { content } = body;

    // 🔥 Get solution
    const sol = await query(
      `SELECT * FROM solutions WHERE id = $1`,
      [id]
    );

    if (sol.rows.length === 0) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    const solution = sol.rows[0];

    // 🔥 Get user
    const userRes = await query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    const dbUser = userRes.rows[0];

    if (solution.user_id !== dbUser.id) {
      return NextResponse.json(
        { success: false, message: "Not allowed" },
        { status: 403 }
      );
    }

    // 🔥 New version insert
    const res = await query(
      `INSERT INTO solutions 
      (problem_id, user_id, content, version)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [
        solution.problem_id,
        dbUser.id,
        content,
        solution.version + 1,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "Updated (new version)",
      data: res.rows[0],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// ✅ DELETE
export async function DELETE(req, { params }) {
  try {
    const user = await currentUser();
    const { id } = params;

    if (!user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const sol = await query(
      `SELECT * FROM solutions WHERE id = $1`,
      [id]
    );

    const solution = sol.rows[0];

    const userRes = await query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    const dbUser = userRes.rows[0];

    if (solution.user_id !== dbUser.id) {
      return NextResponse.json(
        { success: false, message: "Not allowed" },
        { status: 403 }
      );
    }

    await query(`DELETE FROM solutions WHERE id = $1`, [id]);

    return NextResponse.json({
      success: true,
      message: "Solution deleted",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}