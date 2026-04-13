import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { addPoints } from "@/lib/gamification";

// ✅ VOTE (UPVOTE / DOWNVOTE / TOGGLE)
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
    const { solutionId, value } = body;

    if (!solutionId || ![1, -1].includes(value)) {
      return NextResponse.json(
        { success: false, message: "Invalid vote" },
        { status: 400 }
      );
    }

    // 🔥 Get DB user (voter)
    const userRes = await query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    const dbUser = userRes.rows[0];

    // 🔥 Get solution owner
    const solutionRes = await query(
      `SELECT * FROM solutions WHERE id = $1`,
      [solutionId]
    );

    const solution = solutionRes.rows[0];

    if (!solution) {
      return NextResponse.json(
        { success: false, message: "Solution not found" },
        { status: 404 }
      );
    }

    const ownerId = solution.user_id;

    // 🔥 Check existing vote
    const existing = await query(
      `SELECT * FROM votes WHERE user_id = $1 AND solution_id = $2`,
      [dbUser.id, solutionId]
    );

    // 🔁 Case 1: Same vote → remove
    if (existing.rows.length > 0) {
      const prevVote = existing.rows[0];

      if (prevVote.value === value) {
        await query(
          `DELETE FROM votes WHERE user_id = $1 AND solution_id = $2`,
          [dbUser.id, solutionId]
        );

        return NextResponse.json({
          success: true,
          message: "Vote removed",
        });
      }

      // 🔁 Case 2: Opposite vote → update
      await query(
        `UPDATE votes SET value = $1 WHERE user_id = $2 AND solution_id = $3`,
        [value, dbUser.id, solutionId]
      );

      // 🎯 POINTS LOGIC
      if (value === 1) {
        await addPoints(ownerId, 2, "upvote_received");
      }

      return NextResponse.json({
        success: true,
        message: "Vote updated",
      });
    }

    // ✅ Case 3: New vote
    await query(
      `INSERT INTO votes (user_id, solution_id, value)
       VALUES ($1, $2, $3)`,
      [dbUser.id, solutionId, value]
    );

    // 🎯 POINTS LOGIC (ONLY for upvote)
    if (value === 1) {
      await addPoints(ownerId, 2, "upvote_received");
    }

    return NextResponse.json({
      success: true,
      message: "Vote added",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Voting failed" },
      { status: 500 }
    );
  }
}