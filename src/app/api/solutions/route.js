// src/app/api/solutions/route.js

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const solutions = [
      {
        id: 1,
        title: "AI Traffic Control System",
        problemId: 1,
        author: "Anuj Kushwaha",
        status: "Approved",
        votes: 128,
        tech: "React, Node.js, AI",
      },
      {
        id: 2,
        title: "Smart Learning Platform",
        problemId: 2,
        author: "Priya Sharma",
        status: "Pending",
        votes: 74,
        tech: "Next.js, Python",
      },
      {
        id: 3,
        title: "Village Telemedicine App",
        problemId: 3,
        author: "Rahul Verma",
        status: "Rejected",
        votes: 39,
        tech: "Flutter, Firebase",
      },
    ];

    return NextResponse.json({
      success: true,
      total: solutions.length,
      data: solutions,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch solutions.",
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
      problemId,
      author,
      tech,
    } = body;

    if (!title || !problemId || !author) {
      return NextResponse.json(
        {
          success: false,
          message: "Title, problemId and author are required.",
        },
        { status: 400 }
      );
    }

    const newSolution = {
      id: Date.now(),
      title,
      problemId,
      author,
      tech: tech || "Not Provided",
      status: "Pending",
      votes: 0,
    };

    return NextResponse.json({
      success: true,
      message: "Solution submitted successfully.",
      data: newSolution,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit solution.",
      },
      { status: 500 }
    );
  }
}