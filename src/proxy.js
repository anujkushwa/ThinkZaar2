import { NextResponse } from "next/server";

export function proxy(request) {
  return NextResponse.next({
    request,
  });
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
