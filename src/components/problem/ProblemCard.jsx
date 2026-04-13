export function ProblemCard({
  title,
  category,
  description,
  votes,
  author,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300">
          {category}
        </span>

        <span className="text-sm text-slate-400">{votes} Votes</span>
      </div>

      <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>

      <p className="mt-3 line-clamp-3 text-slate-400">{description}</p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm text-slate-500">By {author}</span>

        <button className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white hover:bg-cyan-500 hover:text-slate-950">
          View Details
        </button>
      </div>
    </div>
  );
}
