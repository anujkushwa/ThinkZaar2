import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    await query(
      `UPDATE users SET is_verified = true, role = 'expert' WHERE id = $1`,
      [userId]
    );

    return NextResponse.json({
      success: true,
      message: "User verified as expert",
    });
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}