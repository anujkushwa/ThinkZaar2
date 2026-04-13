// src/app/api/vote/route.js

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const votes = [
      {
        id: 1,
        userId: 1,
        solutionId: 1,
        type: "upvote",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        userId: 2,
        solutionId: 1,
        type: "upvote",
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        userId: 3,
        solutionId: 2,
        type: "upvote",
        createdAt: new Date().toISOString(),
      },
    ];

    return NextResponse.json({
      success: true,
      total: votes.length,
      data: votes,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch votes.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      userId,
      solutionId,
      type = "upvote",
    } = body;

    if (!userId || !solutionId) {
      return NextResponse.json(
        {
          success: false,
          message: "userId and solutionId are required.",
        },
        { status: 400 }
      );
    }

    const vote = {
      id: Date.now(),
      userId,
      solutionId,
      type,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      message: "Vote submitted successfully.",
      data: vote,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit vote.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const body = await req.json();

    const { voteId } = body;

    if (!voteId) {
      return NextResponse.json(
        {
          success: false,
          message: "voteId is required.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Vote ${voteId} removed successfully.`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove vote.",
      },
      { status: 500 }
    );
  }
}