import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { addPoints } from "@/lib/gamification";
import { evaluateSolutionAgainstProblem } from "@/lib/ai";

// ✅ GET solutions by problem_id
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const problemId = searchParams.get("problemId");

    if (!problemId) {
      return NextResponse.json(
        { success: false, message: "problemId required" },
        { status: 400 }
      );
    }

    const user = await currentUser();
    let dbUserId = null;
    if (user) {
      const userRes = await query(`SELECT id FROM users WHERE clerk_id = $1`, [
        user.id,
      ]);
      dbUserId = userRes.rows[0]?.id ?? null;
    }

    const res = await query(
      `SELECT
         s.*,
         u.name,
         u.image,
         COALESCE(vt.score, 0)::int as score,
         COALESCE(vt.upvotes, 0)::int as upvotes,
         COALESCE(vt.downvotes, 0)::int as downvotes,
         COALESCE(uv.value, 0)::int as user_vote
       FROM solutions s
       JOIN users u ON s.user_id = u.id
       LEFT JOIN (
         SELECT
           solution_id,
           SUM(value)::int as score,
           SUM(CASE WHEN value = 1 THEN 1 ELSE 0 END)::int as upvotes,
           SUM(CASE WHEN value = -1 THEN 1 ELSE 0 END)::int as downvotes
         FROM votes
         GROUP BY solution_id
       ) vt ON vt.solution_id = s.id
       LEFT JOIN votes uv
         ON uv.solution_id = s.id
        AND uv.user_id = $2
       WHERE s.problem_id = $1
       ORDER BY s.created_at DESC`,
      [problemId, dbUserId]
    );

    return NextResponse.json({
      success: true,
      total: res.rows.length,
      data: res.rows,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch solutions" },
      { status: 500 }
    );
  }
}

// ✅ SUBMIT SOLUTION
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
    const { problemId, content, fileUrl, externalLink } = body;

    if (!problemId || !content) {
      return NextResponse.json(
        { success: false, message: "Problem & content required" },
        { status: 400 }
      );
    }

    // 🔥 Get DB user
    const userRes = await query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    const dbUser = userRes.rows[0];

    if (!dbUser) {
      return NextResponse.json(
        { success: false, message: "User not found in DB" },
        { status: 404 }
      );
    }

    // 🔥 Check existing solution for versioning
    const existing = await query(
      `SELECT * FROM solutions 
       WHERE user_id = $1 AND problem_id = $2 
       ORDER BY version DESC LIMIT 1`,
      [dbUser.id, problemId]
    );

    let version = 1;

    if (existing.rows.length > 0) {
      version = existing.rows[0].version + 1;
    }

    // 🔥 Insert solution
    await addPoints(dbUser.id, 10, "solution_submitted");
    const res = await query(
      `INSERT INTO solutions 
      (problem_id, user_id, content, file_url, external_link, version)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        problemId,
        dbUser.id,
        content,
        fileUrl || null,
        externalLink || null,
        version,
      ]
    );

    // 🤖 Optional: Groq AI evaluation (stores scores for transparency)
    try {
      const pRes = await query(
        `SELECT title, description, constraints, expected_outcomes, requirements
         FROM problems
         WHERE id = $1`,
        [problemId]
      );
      const p = pRes.rows[0];
      if (p) {
        const evalRes = await evaluateSolutionAgainstProblem({
          problemTitle: p.title,
          problemDescription: p.description,
          problemConstraints: p.constraints,
          problemExpectedOutcomes: p.expected_outcomes,
          problemRequirements: p.requirements,
          solutionText: content,
        });

        const scores = evalRes?.scores;
        if (scores) {
          const feasibility = Math.max(0, Math.min(100, Number(scores.feasibility)));
          const creativity = Math.max(0, Math.min(100, Number(scores.creativity)));
          const effectiveness = Math.max(
            0,
            Math.min(100, Number(scores.effectiveness))
          );
          const total = Math.round((feasibility + creativity + effectiveness) / 3);

          await query(
            `UPDATE solutions
             SET feasibility_score = $2,
                 creativity_score = $3,
                 effectiveness_score = $4,
                 total_score = $5
             WHERE id = $1`,
            [res.rows[0].id, feasibility, creativity, effectiveness, total]
          );
        }
      }
    } catch (e) {
      console.error("AI evaluation skipped:", e);
    }

    return NextResponse.json({
      success: true,
      message: "Solution submitted",
      data: res.rows[0],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to submit solution" },
      { status: 500 }
    );
  }
}