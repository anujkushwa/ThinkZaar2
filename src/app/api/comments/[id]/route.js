import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function DELETE(req, { params }) {
  try {
    const user = await currentUser();
    const { id } = params;

    if (!user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const commentRes = await query(
      `SELECT * FROM comments WHERE id = $1`,
      [id]
    );

    const comment = commentRes.rows[0];

    const userRes = await query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    const dbUser = userRes.rows[0];

    if (comment.user_id !== dbUser.id) {
      return NextResponse.json(
        { success: false, message: "Not allowed" },
        { status: 403 }
      );
    }

    await query(`DELETE FROM comments WHERE id = $1`, [id]);

    return NextResponse.json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}