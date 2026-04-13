// src/app/api/problems/[id]/route.js

import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const problem = {
      id,
      title: "Traffic Congestion in Smart Cities",
      category: "Transport",
      status: "Open",
      reward: "₹25,000",
      applicants: 42,
      deadline: "30 Apr 2026",
      description:
        "Need scalable AI based traffic management system.",
      requirements: [
        "Modern UI",
        "Real-time tracking",
        "Scalable backend",
      ],
    };

    return NextResponse.json({
      success: true,
      data: problem,
    });
  } catch (error) {
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
    const { id } = params;
    const body = await req.json();

    return NextResponse.json({
      success: true,
      message: `Problem ${id} updated successfully.`,
      updatedData: body,
    });
  } catch (error) {
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
    const { id } = params;

    return NextResponse.json({
      success: true,
      message: `Problem ${id} deleted successfully.`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete problem.",
      },
      { status: 500 }
    );
  }
}