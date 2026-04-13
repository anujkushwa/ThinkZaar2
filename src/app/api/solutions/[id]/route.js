import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  return NextResponse.json({ message: "Get solution", id: params.id });
}

export async function PATCH(_request, { params }) {
  return NextResponse.json({ message: "Update solution", id: params.id });
}

export async function DELETE(_request, { params }) {
  return NextResponse.json({ message: "Delete solution", id: params.id });
}
