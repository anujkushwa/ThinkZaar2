import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { query } from "@/lib/db";

// ✅ GET: Current Logged-in User (REAL)
export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const res = await query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    return NextResponse.json({
      success: true,
      data: res.rows[0],
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// ✅ POST: Auto Sync Clerk User → DB
export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔥 Check if user already exists
    const existing = await query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    if (existing.rows.length > 0) {
      return NextResponse.json({
        success: true,
        message: "User already exists",
        data: existing.rows[0],
      });
    }

    // 🎯 Default Role
    const role = "solver";

    // 🔥 Create new user
    const newUser = await query(
      `INSERT INTO users 
      (clerk_id, name, email, image, role, points, status)
      VALUES ($1, $2, $3, $4, $5, 0, 'active')
      RETURNING *`,
      [
        user.id,
        user.fullName || "User",
        user.emailAddresses[0]?.emailAddress,
        user.imageUrl,
        role,
      ]
    );

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: newUser.rows[0],
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to create user" },
      { status: 500 }
    );
  }
}