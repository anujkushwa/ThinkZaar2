"use client";

import { useEffect, useMemo, useState } from "react";

export default function LeaderboardPage() {
  const [loading, setLoading] = useState(true);
  const [leaders, setLeaders] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/leaderboard");
        const data = await res.json();
        if (!cancelled) setLeaders(data?.data ?? []);
      } catch (e) {
        if (!cancelled) setError("Failed to load leaderboard");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const ranked = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = Array.isArray(leaders) ? leaders : [];
    const filtered = q
      ? base.filter((u) => (u.name || "").toLowerCase().includes(q))
      : base;
    return filtered.map((u, idx) => ({
      ...u,
      rank: idx + 1,
      badge: idx === 0 ? "🏆 Legend" : idx === 1 ? "🥈 Elite" : idx === 2 ? "🥉 Rising Star" : "⭐ Active",
    }));
  }, [leaders, search]);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-12">
          <p className="text-sm uppercase tracking-[0.4em] text-cyan-400">
            ThinkZaar Rankings
          </p>

          <h1 className="mt-4 text-5xl font-bold md:text-6xl">
            Global Leaderboard
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-400">
            Top creators, innovators, mentors and problem-solvers ranked by
            solutions, votes, activity, and impact on the ThinkZaar platform.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <TopStat title="Total Participants" value="12,540+" />
            <TopStat title="Solutions Submitted" value="31,200+" />
            <TopStat title="Votes Casted" value="4.8M+" />
          </div>
        </section>

        {/* Top 3 Podium */}
        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {ranked.slice(0, 3).map((user) => (
            <div
              key={user.rank}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center transition hover:border-cyan-400"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/20 text-3xl">
                #{user.rank}
              </div>

              <h2 className="mt-5 text-2xl font-bold">{user.name}</h2>
              <p className="mt-1 text-cyan-400">{user.role || "solver"}</p>

              <p className="mt-3 text-lg">{user.badge}</p>

              <h3 className="mt-5 text-4xl font-bold text-cyan-400">
                {user.points}
              </h3>

              <p className="text-slate-400">Points</p>

              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <MiniCard label="Solutions" value={user.solutions || 0} />
                <MiniCard label="Votes" value={user.votes || 0} />
              </div>
            </div>
          ))}
        </section>

        {/* Full Rankings */}
        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-bold">Full Rankings</h2>

            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {loading && (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 text-slate-400">
              Loading leaderboard...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
              {error}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead className="border-b border-slate-800 text-sm uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="pb-4">Rank</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Role</th>
                  <th className="pb-4">Badge</th>
                  <th className="pb-4">Solutions</th>
                  <th className="pb-4">Votes</th>
                  <th className="pb-4">Points</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {ranked.map((user) => (
                  <tr
                    key={user.rank}
                    className="border-b border-slate-800 transition hover:bg-slate-800/40"
                  >
                    <td className="py-5 font-bold text-cyan-400">
                      #{user.rank}
                    </td>

                    <td className="py-5 font-semibold">{user.name}</td>

                    <td className="py-5 text-slate-300">{user.role || "solver"}</td>

                    <td className="py-5">{user.badge}</td>

                    <td className="py-5">{user.solutions || 0}</td>

                    <td className="py-5">{user.votes || 0}</td>

                    <td className="py-5 font-bold text-cyan-400">
                      {user.points}
                    </td>

                    <td className="py-5">
                      <button className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-cyan-500 hover:text-slate-950">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Rewards */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <RewardCard
            title="🥇 Rank #1 Reward"
            desc="Premium badge, spotlight profile, and featured homepage placement."
          />
          <RewardCard
            title="🥈 Rank #2 Reward"
            desc="Verified elite creator badge and homepage feature."
          />
          <RewardCard
            title="🥉 Rank #3 Reward"
            desc="Top performer badge and priority visibility."
          />
        </section>
      </div>
    </main>
  );
}

function TopStat({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-cyan-400">{value}</h3>
    </div>
  );
}

function MiniCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-4">
      <p className="text-slate-400">{label}</p>
      <h4 className="mt-1 text-xl font-bold text-cyan-400">{value}</h4>
    </div>
  );
}

function RewardCard({ title, desc }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-slate-400">{desc}</p>

      <button className="mt-6 rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
        Learn More
      </button>
    </div>
  );
}