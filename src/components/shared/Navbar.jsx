"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wide text-cyan-400">
          ThinkZaar
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-slate-300 hover:text-cyan-400">
            Home
          </Link>
          <Link href="/problems" className="text-slate-300 hover:text-cyan-400">
            Problems
          </Link>
          <Link href="/dashboard" className="text-slate-300 hover:text-cyan-400">
            Dashboard
          </Link>
          <Link href="/about" className="text-slate-300 hover:text-cyan-400">
            About
          </Link>
        </nav>

        {/* Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="rounded-xl border border-slate-700 px-4 py-2 text-white hover:border-cyan-400">
            Login
          </button>

          <button className="rounded-xl bg-cyan-500 px-4 py-2 font-medium text-slate-950 hover:bg-cyan-400">
            Get Started
          </button>
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
          <Link href="/dashboard" className="block text-slate-300">
            Dashboard
          </Link>
          <Link href="/about" className="block text-slate-300">
            About
          </Link>
        </div>
      )}
    </header>
  );
}
