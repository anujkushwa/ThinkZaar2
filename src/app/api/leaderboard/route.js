// src/app/api/leaderboard/route.js

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const leaderboard = [
      {
        id: 1,
        rank: 1,
        name: "Anuj Kushwaha",
        role: "Innovator",
        points: 9850,
        solutions: 48,
        votes: 2410,
        badge: "🏆 Legend",
      },
      {
        id: 2,
        rank: 2,
        name: "Priya Sharma",
        role: "Mentor",
        points: 9120,
        solutions: 39,
        votes: 1980,
        badge: "🥈 Elite",
      },
      {
        id: 3,
        rank: 3,
        name: "Rahul Verma",
        role: "Student",
        points: 8740,
        solutions: 35,
        votes: 1760,
        badge: "🥉 Rising Star",
      },
      {
        id: 4,
        rank: 4,
        name: "Neha Singh",
        role: "Innovator",
        points: 8210,
        solutions: 31,
        votes: 1655,
        badge: "🚀 Pro",
      },
      {
        id: 5,
        rank: 5,
        name: "Amit Yadav",
        role: "Mentor",
        points: 7900,
        solutions: 29,
        votes: 1512,
        badge: "🔥 Expert",
      },
    ];

    return NextResponse.json({
      success: true,
      totalUsers: leaderboard.length,
      updatedAt: new Date().toISOString(),
      data: leaderboard,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch leaderboard.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, role, points } = body;

    if (!name || !role || !points) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, role and points are required.",
        },
        { status: 400 }
      );
    }

    const newEntry = {
      id: Date.now(),
      rank: 99,
      name,
      role,
      points,
      solutions: 0,
      votes: 0,
      badge: "⭐ New Entry",
    };

    return NextResponse.json({
      success: true,
      message: "Leaderboard entry added successfully.",
      data: newEntry,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create leaderboard entry.",
      },
      { status: 500 }
    );
  }
}