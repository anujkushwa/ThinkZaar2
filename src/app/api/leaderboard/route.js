import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query(
      `SELECT id, name, image, points
       FROM users
       ORDER BY points DESC
       LIMIT 10`
    );

    return NextResponse.json({
      success: true,
      data: res.rows,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed leaderboard" },
      { status: 500 }
    );
  }
}