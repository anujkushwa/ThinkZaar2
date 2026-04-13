import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { points: 0 },
        { status: 401 }
      );
    }

    const res = await query(
      `SELECT points FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    return NextResponse.json({
      points: res.rows[0]?.points || 0,
    });

  } catch (error) {
    return NextResponse.json({ points: 0 });
  }
}