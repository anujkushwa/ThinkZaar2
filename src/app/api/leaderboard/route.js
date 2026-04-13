import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const res = await query(
      `SELECT
         u.id,
         u.name,
         u.image,
         u.role,
         u.points,
         COALESCE(sol.solution_count, 0)::int as solutions,
         COALESCE(vt.vote_sum, 0)::int as votes
       FROM users u
       LEFT JOIN (
         SELECT user_id, COUNT(*) as solution_count
         FROM solutions
         GROUP BY user_id
       ) sol ON sol.user_id = u.id
       LEFT JOIN (
         SELECT s.user_id, SUM(v.value) as vote_sum
         FROM solutions s
         LEFT JOIN votes v ON v.solution_id = s.id
         GROUP BY s.user_id
       ) vt ON vt.user_id = u.id
       ORDER BY u.points DESC
       LIMIT 50`
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