import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "List problems" });
}

export async function POST() {
  return NextResponse.json({ message: "Create problem" }, { status: 201 });
}
