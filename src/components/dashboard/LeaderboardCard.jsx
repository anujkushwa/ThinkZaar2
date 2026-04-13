export function LeaderboardCard({ users }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-xl font-semibold text-white">Top Innovators</h3>

      <div className="mt-5 space-y-4">
        {users.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl bg-slate-800 px-4 py-3"
          >
            <div>
              <p className="font-medium text-white">
                #{index + 1} {user.name}
              </p>
              <p className="text-sm text-slate-400">{user.role}</p>
            </div>

            <span className="text-cyan-400 font-semibold">
              {user.points} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}