import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const res = await query(
      `SELECT p.*, u.name as user_name, u.image as user_image
       FROM problems p
       JOIN users u ON p.user_id = u.id
       WHERE p.id = $1`,
      [id]
    );

    const problem = res.rows[0];
    if (!problem) {
      return NextResponse.json(
        { success: false, message: "Problem not found" },
        { status: 404 }
      );
    }

    const sol = await query(
      `SELECT COUNT(*)::int as solution_count
       FROM solutions s
       WHERE s.problem_id = $1`,
      [id]
    );

    return NextResponse.json({
      success: true,
      data: { ...problem, solution_count: sol.rows[0]?.solution_count ?? 0 },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch problem details.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;
    const body = await req.json();

    // Only creator can update.
    const userRes = await query(`SELECT id FROM users WHERE clerk_id = $1`, [
      user.id,
    ]);
    const dbUserId = userRes.rows[0]?.id;
    if (!dbUserId) {
      return NextResponse.json(
        { success: false, message: "User not found in DB" },
        { status: 404 }
      );
    }

    const ownerRes = await query(`SELECT user_id FROM problems WHERE id = $1`, [
      id,
    ]);
    const ownerId = ownerRes.rows[0]?.user_id;
    if (!ownerId) {
      return NextResponse.json(
        { success: false, message: "Problem not found" },
        { status: 404 }
      );
    }
    if (ownerId !== dbUserId) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    const {
      title,
      description,
      category,
      tags,
      difficulty,
      status,
      reward,
      deadline,
      expected_outcomes,
      constraints,
    } = body ?? {};

    const updated = await query(
      `UPDATE problems SET
        title = COALESCE($2, title),
        description = COALESCE($3, description),
        category = COALESCE($4, category),
        tags = COALESCE($5, tags),
        difficulty = COALESCE($6, difficulty),
        status = COALESCE($7, status),
        reward = COALESCE($8, reward),
        deadline = COALESCE($9, deadline),
        expected_outcomes = COALESCE($10, expected_outcomes),
        constraints = COALESCE($11, constraints)
       WHERE id = $1
       RETURNING *`,
      [
        id,
        title ?? null,
        description ?? null,
        category ?? null,
        Array.isArray(tags) ? tags : null,
        difficulty ?? null,
        status ?? null,
        reward ?? null,
        deadline ?? null,
        expected_outcomes ?? null,
        constraints ?? null,
      ]
    );

    return NextResponse.json({
      success: true,
      message: `Problem ${id} updated successfully.`,
      data: updated.rows[0],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update problem.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = params;

    const userRes = await query(`SELECT id FROM users WHERE clerk_id = $1`, [
      user.id,
    ]);
    const dbUserId = userRes.rows[0]?.id;
    if (!dbUserId) {
      return NextResponse.json(
        { success: false, message: "User not found in DB" },
        { status: 404 }
      );
    }

    const ownerRes = await query(`SELECT user_id FROM problems WHERE id = $1`, [
      id,
    ]);
    const ownerId = ownerRes.rows[0]?.user_id;
    if (!ownerId) {
      return NextResponse.json(
        { success: false, message: "Problem not found" },
        { status: 404 }
      );
    }
    if (ownerId !== dbUserId) {
      return NextResponse.json(
        { success: false, message: "Forbidden" },
        { status: 403 }
      );
    }

    await query(`DELETE FROM problems WHERE id = $1`, [id]);

    return NextResponse.json({
      success: true,
      message: `Problem ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete problem.",
      },
      { status: 500 }
    );
  }
}