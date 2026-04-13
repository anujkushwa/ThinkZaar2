// src/app/api/solutions/[id]/route.js

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const solution = {
      id,
      title: "AI Traffic Control System",
      problemId: 1,
      author: "Anuj Kushwaha",
      status: "Approved",
      votes: 128,
      tech: "React, Node.js, AI",
      github: "https://github.com/demo/project",
      demo: "https://demo.com",
      summary:
        "Smart AI based traffic optimization system using live analytics.",
    };

    return NextResponse.json({
      success: true,
      data: solution,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch solution details.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();

    return NextResponse.json({
      success: true,
      message: `Solution ${id} updated successfully.`,
      updatedData: body,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update solution.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    return NextResponse.json({
      success: true,
      message: `Solution ${id} deleted successfully.`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete solution.",
      },
      { status: 500 }
    );
  }
}