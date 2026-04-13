import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "List solutions" });
}

export async function POST() {
  return NextResponse.json({ message: "Create solution" }, { status: 201 });
}
