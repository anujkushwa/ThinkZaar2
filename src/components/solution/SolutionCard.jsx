"use client";

export function SolutionCard({
  title,
  description,
  author,
  votes = 0,
  status = "Pending",
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:border-cyan-400">
      {/* Top */}
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm font-medium text-cyan-300">
          {status}
        </span>

        <span className="text-sm text-slate-400">{votes} Votes</span>
      </div>

      {/* Title */}
      <h3 className="mt-4 text-2xl font-bold text-white">{title}</h3>

      {/* Desc */}
      <p className="mt-3 line-clamp-4 leading-relaxed text-slate-400">
        {description}
      </p>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-800 pt-4">
        <div>
          <p className="text-sm text-slate-500">Submitted by</p>
          <p className="font-medium text-cyan-400">{author}</p>
        </div>

        <button className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-white hover:bg-cyan-500 hover:text-slate-950">
          View
        </button>
      </div>
    </div>
  );
};