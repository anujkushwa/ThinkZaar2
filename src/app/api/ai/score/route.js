import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title = "", description = "" } = await req.json();

    let score = 50;

    if (title.length > 10) score += 10;
    if (description.length > 100) score += 15;
    if (
      description.toLowerCase().includes("ai") ||
      description.toLowerCase().includes("technology")
    ) {
      score += 15;
    }

    if (score > 100) score = 100;

    let level = "Average";

    if (score >= 80) level = "Excellent";
    else if (score >= 65) level = "Good";

    return NextResponse.json({
      success: true,
      score,
      level,
      message: "Idea score generated successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to score idea.",
      },
      { status: 500 }
    );
  }
}
