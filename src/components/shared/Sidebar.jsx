"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Problems", path: "/problems" },
    { name: "Ideas", path: "/ideas" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="min-h-screen w-64 border-r border-slate-800 bg-slate-950 p-6">
      <h2 className="text-2xl font-bold text-cyan-400">ThinkZaar</h2>

      <nav className="mt-10 space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`block rounded-xl px-4 py-3 transition ${
              pathname === item.path
                ? "bg-cyan-500 text-slate-950 font-semibold"
                : "text-slate-300 hover:bg-slate-900 hover:text-cyan-400"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}