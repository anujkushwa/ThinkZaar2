import { NextResponse } from "next/server";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { query } from "@/lib/db";

const ALLOWED_ROLES = new Set(["solver", "mentor"]);

export async function PATCH(req) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const role = body?.role;

    if (!ALLOWED_ROLES.has(role)) {
      return NextResponse.json(
        { success: false, message: "Invalid role" },
        { status: 400 }
      );
    }

    // Update DB role (create user row if missing).
    const existing = await query(`SELECT id FROM users WHERE clerk_id = $1`, [
      user.id,
    ]);

    if (existing.rows.length === 0) {
      await query(
        `INSERT INTO users (clerk_id, name, email, image, role, points, status)
         VALUES ($1, $2, $3, $4, $5, 0, 'active')`,
        [
          user.id,
          user.fullName || "User",
          user.emailAddresses[0]?.emailAddress,
          user.imageUrl,
          role,
        ]
      );
    } else {
      await query(`UPDATE users SET role = $1 WHERE clerk_id = $2`, [role, user.id]);
    }

    // Update Clerk publicMetadata role so UI routing works.
    await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: { role },
      unsafeMetadata: { role },
    });

    return NextResponse.json({ success: true, role });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to update role" },
      { status: 500 }
    );
  }
}

