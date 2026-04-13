// src/app/api/users/profile/route.js

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = {
      id: 1,
      name: "Anuj Kushwaha",
      email: "anuj@example.com",
      role: "Innovator",
      points: 9850,
      rank: "#7",
      joined: "Jan 2026",
      bio: "Builder, learner, and startup enthusiast.",
      skills: ["React", "Next.js", "Node.js", "AI"],
    };

    return NextResponse.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const body = await req.json();

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      updatedData: body,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile.",
      },
      { status: 500 }
    );
  }
}