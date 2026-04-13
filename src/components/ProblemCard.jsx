"use client";

import Link from "next/link";

export default function ProblemCard({ problem }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-cyan-400 transition">

      {/* 🔥 USER INFO */}
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-bold">
          {problem.user_name?.charAt(0) || "U"}
        </div>

        <div>
          <p className="font-semibold text-white">
            {problem.user_name || "Anonymous"}
          </p>
          <p className="text-xs text-slate-400">
            {problem.created_at || "Just now"}
          </p>
        </div>
      </div>

      {/* 🔥 POST CONTENT */}
      <Link href={`/problem/${problem.id}`}>
        <div className="cursor-pointer">

          {/* Title */}
          <h2 className="text-xl font-bold mb-2 hover:text-cyan-400 transition">
            {problem.title}
          </h2>

          {/* Description */}
          <p className="text-slate-400 text-sm line-clamp-3">
            {problem.description}
          </p>

        </div>
      </Link>

      {/* 🔥 TAGS */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded-full">
          {problem.category}
        </span>

        <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full">
          {problem.difficulty || "easy"}
        </span>

        <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
          {problem.status}
        </span>
      </div>

      {/* 🔥 ACTION BAR */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-slate-800 text-sm text-slate-400">

        {/* Left */}
        <div className="flex gap-4">
          <span>👍 {problem.votes || 0}</span>
          <span>💬 {problem.comments || 0}</span>
        </div>

        {/* Right */}
        <div className="flex gap-4">
          <span>💰 {problem.reward || "N/A"}</span>
          <span>👥 {problem.applicants || 0}</span>
        </div>

      </div>
    </div>
  );
}