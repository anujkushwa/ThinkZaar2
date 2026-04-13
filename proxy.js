import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 🔐 Protected routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/profile(.*)",
  "/settings(.*)",
  "/my-problems(.*)",
  "/my-solutions(.*)",
  "/create-problem(.*)",
  "/notifications(.*)",
  "/problems(.*)",
  "/problem(.*)",
]);

// 👑 Admin routes
const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
]);

// 🎓 Mentor routes
const isMentorRoute = createRouteMatcher([
  "/mentor(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // 🔒 Not logged in → redirect to sign-in
  if (isProtectedRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // 🧠 Get role safely
  const role = sessionClaims?.publicMetadata?.role || "user";

  // 👑 Admin protection
  if (isAdminRoute(req) && role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 🎓 Mentor protection
  if (isMentorRoute(req) && role !== "mentor") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico)).*)",
    "/(api|trpc)(.*)",
  ],
};