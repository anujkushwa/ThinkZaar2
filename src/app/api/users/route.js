// src/app/api/users/route.js

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = [
      {
        id: 1,
        name: "Anuj Kushwaha",
        email: "anuj@example.com",
        role: "Innovator",
        points: 9850,
        status: "Active",
      },
      {
        id: 2,
        name: "Priya Sharma",
        email: "priya@example.com",
        role: "Mentor",
        points: 9120,
        status: "Active",
      },
      {
        id: 3,
        name: "Rahul Verma",
        email: "rahul@example.com",
        role: "Student",
        points: 8740,
        status: "Inactive",
      },
    ];

    return NextResponse.json({
      success: true,
      total: users.length,
      data: users,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch users.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, role } = body;

    if (!name || !email || !role) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and role are required.",
        },
        { status: 400 }
      );
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      role,
      points: 0,
      status: "Active",
    };

    return NextResponse.json({
      success: true,
      message: "User created successfully.",
      data: newUser,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create user.",
      },
      { status: 500 }
    );
  }
}