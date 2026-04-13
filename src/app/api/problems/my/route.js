import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userRes = await query(`SELECT id FROM users WHERE clerk_id = $1`, [
      user.id,
    ]);
    const dbUserId = userRes.rows[0]?.id;

    if (!dbUserId) {
      return NextResponse.json({ success: true, data: [] });
    }

    const res = await query(
      `SELECT p.*, u.name as user_name, u.image as user_image
       FROM problems p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = $1
       ORDER BY p.created_at DESC`,
      [dbUserId]
    );

    return NextResponse.json({ success: true, data: res.rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch user problems" },
      { status: 500 }
    );
  }
}