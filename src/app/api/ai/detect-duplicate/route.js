import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { title = "", description = "" } = await req.json();

    const sampleProblems = [
      "Traffic congestion in smart cities",
      "Affordable AI education platform",
      "Waste management automation system",
      "Rural healthcare access issue",
    ];

    const text = `${title} ${description}`.toLowerCase();

    const matched = sampleProblems.find((item) =>
      text.includes(item.toLowerCase().split(" ")[0])
    );

    return NextResponse.json({
      success: true,
      duplicate: !!matched,
      matchedTitle: matched || null,
      message: matched
        ? "Similar problem already exists."
        : "No duplicate found.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to detect duplicate.",
      },
      { status: 500 }
    );
  }
}
