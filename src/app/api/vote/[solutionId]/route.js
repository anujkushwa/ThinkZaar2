import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  try {
    const { solutionId } = params;

    // 🔥 Total score
    const res = await query(
      `SELECT 
        SUM(CASE WHEN value = 1 THEN 1 ELSE 0 END) as upvotes,
        SUM(CASE WHEN value = -1 THEN 1 ELSE 0 END) as downvotes,
        SUM(value) as score
       FROM votes
       WHERE solution_id = $1`,
      [solutionId]
    );

    const user = await currentUser();
    let userVote = 0;

    if (user) {
      const userRes = await query(
        `SELECT u.id FROM users u WHERE u.clerk_id = $1`,
        [user.id]
      );

      const dbUser = userRes.rows[0];

      if (dbUser) {
        const voteRes = await query(
          `SELECT value FROM votes WHERE user_id = $1 AND solution_id = $2`,
          [dbUser.id, solutionId]
        );

        if (voteRes.rows.length > 0) {
          userVote = voteRes.rows[0].value;
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        upvotes: parseInt(res.rows[0].upvotes) || 0,
        downvotes: parseInt(res.rows[0].downvotes) || 0,
        score: parseInt(res.rows[0].score) || 0,
        userVote,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch votes" },
      { status: 500 }
    );
  }
}