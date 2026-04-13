// src/app/api/problems/route.js

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const problems = [
      {
        id: 1,
        title: "Traffic Congestion in Smart Cities",
        category: "Transport",
        status: "Open",
        reward: "₹25,000",
        applicants: 42,
        deadline: "30 Apr 2026",
      },
      {
        id: 2,
        title: "Affordable AI Education Platform",
        category: "Education",
        status: "In Review",
        reward: "₹10,000",
        applicants: 31,
        deadline: "28 Apr 2026",
      },
      {
        id: 3,
        title: "Waste Management Automation",
        category: "Environment",
        status: "Closed",
        reward: "₹18,000",
        applicants: 22,
        deadline: "20 Apr 2026",
      },
    ];

    return NextResponse.json({
      success: true,
      total: problems.length,
      data: problems,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch problems.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      title,
      category,
      reward,
      deadline,
    } = body;

    if (!title || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "Title and category are required.",
        },
        { status: 400 }
      );
    }

    const newProblem = {
      id: Date.now(),
      title,
      category,
      reward: reward || "N/A",
      deadline: deadline || "Not Set",
      status: "Open",
      applicants: 0,
    };

    return NextResponse.json({
      success: true,
      message: "Problem created successfully.",
      data: newProblem,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create problem.",
      },
      { status: 500 }
    );
  }
}