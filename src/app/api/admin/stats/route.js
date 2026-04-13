import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    // 🔥 Check admin
    const userRes = await query(
      `SELECT role FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    if (userRes.rows[0]?.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Access denied" },
        { status: 403 }
      );
    }

    // 📊 Stats
    const users = await query(`SELECT COUNT(*) FROM users`);
    const problems = await query(`SELECT COUNT(*) FROM problems`);
    const solutions = await query(`SELECT COUNT(*) FROM solutions`);

    return NextResponse.json({
      success: true,
      data: {
        users: parseInt(users.rows[0].count),
        problems: parseInt(problems.rows[0].count),
        solutions: parseInt(solutions.rows[0].count),
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}