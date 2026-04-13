"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import useRealtimePoints from "@/hooks/useRealtimePoints";

export function Navbar() {
  const { user, isLoaded } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [points, setPoints] = useState(0);
  const role = user?.publicMetadata?.role;

  // 🔥 Fetch points (only when logged in)
  useEffect(() => {
    if (!user) return;

    const fetchPoints = async () => {
      try {
        const res = await fetch("/api/users/points");
        const data = await res.json();
        setPoints(data.points || 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPoints();
  }, [user]);

  // 🔥 realtime points update
  useRealtimePoints(setPoints, user?.id);

  // 🔥 Prevent flash
  if (!isLoaded) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide text-cyan-400">
          ThinkZaar
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          

          <Link href="/problems" className="text-slate-300 hover:text-cyan-400">
            Problems
          </Link>

          {user && (
            <>
              <Link href="/dashboard" className="text-slate-300 hover:text-cyan-400">
                Dashboard
              </Link>

              <Link
                href="/create-problem"
                className="text-slate-300 hover:text-cyan-400"
              >
                Post Problem
              </Link>
<Link
                href="/notifications"
                className="text-slate-300 hover:text-cyan-400"
              >
                Notifications
              </Link>

              <Link href="/my-problems" className="text-slate-300 hover:text-cyan-400">
                My Problems
              </Link>

              
              <Link href="/leaderboard" className="text-slate-300 hover:text-cyan-400">
                Leaderboard
              </Link>

              <Link href="/profile" className="text-slate-300 hover:text-cyan-400">
                Profile
              </Link>

              {(role === "admin" || role === "mentor") && (
                <Link
                  href={role === "admin" ? "/admin/dashboard" : "/mentor/dashboard"}
                  className="text-cyan-300 hover:text-cyan-200"
                >
                  {role === "admin" ? "Admin" : "Mentor"}
                </Link>
              )}
            </>
          )}
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          {!user ? (
            <>
              <Link
                href="/sign-in"
                className="rounded-xl border border-slate-700 px-4 py-2 text-white hover:border-cyan-400"
              >
                Login
              </Link>

              <Link
                href="/sign-up"
                className="rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              {/* Points */}
              <div className="px-3 py-1 rounded-lg bg-slate-800 text-cyan-300 text-sm">
                🪙 {points}
              </div>

              {/* User */}
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="space-y-4 border-t border-slate-800 px-6 py-4 md:hidden">
          
          <Link href="/" className="block text-slate-300">
            Home
          </Link>

          <Link href="/problems" className="block text-slate-300">
            Problems
          </Link>

          {user && (
            <>
              <Link href="/dashboard" className="block text-slate-300">
                Dashboard
              </Link>

              <Link href="/create-problem" className="block text-slate-300">
                Post Problem
              </Link>

              <Link href="/leaderboard" className="block text-slate-300">
                Leaderboard
              </Link>

              <Link href="/my-problems" className="block text-slate-300">
                My Problems
              </Link>

              <Link href="/notifications" className="block text-slate-300">
                Notifications
              </Link>

              <Link href="/profile" className="block text-slate-300">
                Profile
              </Link>

              {(role === "admin" || role === "mentor") && (
                <Link
                  href={role === "admin" ? "/admin/dashboard" : "/mentor/dashboard"}
                  className="block text-cyan-300"
                >
                  {role === "admin" ? "Admin" : "Mentor"}
                </Link>
              )}
            </>
          )}

          <Link href="/about" className="block text-slate-300">
            About
          </Link>

          {/* Auth Buttons */}
          {!user ? (
            <>
              <Link href="/sign-in" className="block text-white">
                Login
              </Link>
              <Link href="/sign-up" className="block text-cyan-400">
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-cyan-300">🪙 {points}</span>
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      )}
    </header>
  );
}