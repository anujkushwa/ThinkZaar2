export function ActivityChart() {
  const data = [40, 70, 55, 90, 65, 80, 60];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-semibold text-white">Weekly Activity</h3>

      <div className="mt-6 flex h-56 items-end gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex-1">
            <div
              className="rounded-t-xl bg-cyan-400 transition-all hover:bg-cyan-300"
              style={{ height: `${item}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between text-xs text-slate-500">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  );
}