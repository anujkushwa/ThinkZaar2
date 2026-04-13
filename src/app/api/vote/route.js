import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Vote recorded" }, { status: 201 });
}
