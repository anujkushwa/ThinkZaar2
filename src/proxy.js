// src/proxy.js

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/settings(.*)",
  "/my-problems(.*)",
  "/my-solutions(.*)",
  "/create-problem(.*)",
  "/notifications(.*)",
]);

// Admin routes
const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const pathname = req.nextUrl.pathname;

  // If protected route and not logged in
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Role check for admin
  const role = sessionClaims?.metadata?.role || "user";

  if (isAdminRoute(req) && role !== "admin") {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Skip Next.js internals and static files
     */
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",

    /*
     * Always run for API routes
     */
    "/(api|trpc)(.*)",
  ],
};