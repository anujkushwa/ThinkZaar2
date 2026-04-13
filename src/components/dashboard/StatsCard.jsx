export function StatsCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm uppercase tracking-wide text-slate-400">{title}</p>
      <h2 className="mt-3 text-3xl font-bold text-cyan-400">{value}</h2>
      <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}