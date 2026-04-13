import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { query } from "@/lib/db";

export async function POST(req) {
  try {
    const user = await currentUser();
    const { plan } = await req.json();

    if (!user) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    await query(
      `UPDATE users SET plan = $1 WHERE clerk_id = $2`,
      [plan, user.id]
    );

    return NextResponse.json({
      success: true,
      message: "Subscription updated",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}