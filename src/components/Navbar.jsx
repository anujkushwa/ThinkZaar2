"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import useRealtimePoints from "@/hooks/useRealtimePoints";

export default function Navbar() {
  const { user, isLoaded } = useUser();
  const [points, setPoints] = useState(0);

  // ✅ ALWAYS CALL HOOK (no condition)
  useEffect(() => {
    if (!user) return;

    const fetchPoints = async () => {
      const res = await fetch("/api/user/points");
      const data = await res.json();
      setPoints(data.points || 0);
    };

    fetchPoints();
  }, [user]);

  // ✅ ALWAYS CALL
  useRealtimePoints(setPoints, user?.id);

  // ❗ AFTER hooks → condition
  if (!isLoaded) return null;
  if (!user) return null;

  return (
    <nav className="w-full border-b border-slate-800 bg-slate-950 px-6 py-4 flex items-center justify-between">
      
      <Link href="/dashboard" className="text-xl font-bold text-cyan-400">
        ThinkZaar
      </Link>

      <div className="hidden md:flex items-center gap-6 text-slate-300">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/my-problems">Problems</Link>
        <Link href="/leaderboard">Leaderboard</Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="px-3 py-1 rounded-lg bg-slate-800 text-cyan-300 text-sm">
          🪙 {points}
        </div>

        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}