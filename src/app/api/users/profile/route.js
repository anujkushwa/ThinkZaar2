import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // 🔥 Get user from DB
    const userRes = await query(
      `SELECT * FROM users WHERE clerk_id = $1`,
      [user.id]
    );

    let dbUser = userRes.rows[0];

    // 👉 Agar user DB me nahi hai → create karo
    if (!dbUser) {
      const newUser = await query(
        `INSERT INTO users (clerk_id, name, email, image)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [
          user.id,
          user.fullName || "User",
          user.emailAddresses[0]?.emailAddress,
          user.imageUrl,
        ]
      );

      dbUser = newUser.rows[0];
    }

    // 🔥 Rank calculate karo
    const rankRes = await query(
      `SELECT COUNT(*) + 1 AS rank
       FROM users
       WHERE points > $1`,
      [dbUser.points || 0]
    );

    const rank = `#${rankRes.rows[0].rank}`;

    // ✅ Final Profile Object
    const profile = {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
      role: dbUser.role || "Innovator",
      points: dbUser.points || 0,
      rank,
      joined: dbUser.created_at,
      bio: dbUser.bio || "No bio added",
      skills: dbUser.skills || [],
      image: dbUser.image,
    };

    return NextResponse.json({
      success: true,
      data: profile,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile.",
      },
      { status: 500 }
    );
  }
}