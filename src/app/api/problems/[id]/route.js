import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  return NextResponse.json({ message: "Get problem", id: params.id });
}

export async function PATCH(_request, { params }) {
  return NextResponse.json({ message: "Update problem", id: params.id });
}

export async function DELETE(_request, { params }) {
  return NextResponse.json({ message: "Delete problem", id: params.id });
}
