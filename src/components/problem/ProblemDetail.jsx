export function ProblemDetail({
  title,
  category,
  description,
  author,
  votes,
  date,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-cyan-500/20 px-4 py-1 text-sm text-cyan-300">
          {category}
        </span>

        <span className="text-sm text-slate-400">{votes} Votes</span>
        <span className="text-sm text-slate-500">{date}</span>
      </div>

      <h1 className="mt-5 text-4xl font-bold text-white">{title}</h1>

      <p className="mt-6 leading-relaxed text-slate-300">{description}</p>

      <div className="mt-8 border-t border-slate-800 pt-5">
        <p className="text-sm text-slate-500">Submitted by</p>
        <h4 className="mt-1 text-lg font-semibold text-cyan-400">{author}</h4>
      </div>

      <div className="mt-8 flex gap-4">
        <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
          Upvote Problem
        </button>

        <button className="rounded-xl border border-slate-700 px-6 py-3 text-white hover:border-cyan-400 hover:text-cyan-300">
          Share
        </button>
      </div>
    </div>
  );
}