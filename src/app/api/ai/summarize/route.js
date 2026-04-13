import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { text = "" } = await req.json();

    if (!text.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Text is required.",
        },
        { status: 400 }
      );
    }

    const words = text.split(" ");
    const summary = words.slice(0, 30).join(" ");

    return NextResponse.json({
      success: true,
      summary:
        summary + (words.length > 30 ? "..." : ""),
      message: "Summary created successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to summarize text.",
      },
      { status: 500 }
    );
  }
}