export function AIResultBox({ title, result, score }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-300">
          {score}%
        </span>
      </div>

      <p className="mt-4 text-slate-300 leading-relaxed">{result}</p>

      <div className="mt-5 h-2 w-full rounded-full bg-slate-800">
        <div
          className="h-2 rounded-full bg-cyan-400"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
