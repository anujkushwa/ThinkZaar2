"use client";

import { useState } from "react";

export default function DashboardPage() {
  const [stats] = useState({
    ideas: 24,
    problems: 12,
    solutions: 18,
    votes: 342,
  });

  const activities = [
    "Submitted new problem on Smart Traffic System",
    "Received 14 votes on AI Healthcare Idea",
    "Leaderboard rank improved to #7",
    "Solution approved by mentor",
    "New badge earned: Innovator",
  ];

  const topIdeas = [
    {
      title: "AI Farming Assistant",
      score: 92,
      status: "Trending",
    },
    {
      title: "Smart Waste Management",
      score: 88,
      status: "Approved",
    },
    {
      title: "Campus Skill Exchange",
      score: 84,
      status: "In Review",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
                ThinkZaar Workspace
              </p>

              <h1 className="mt-3 text-4xl font-bold md:text-5xl">
                Dashboard Overview
              </h1>

              <p className="mt-3 max-w-2xl text-slate-400">
                Manage ideas, monitor performance, track rankings, and grow your
                innovation journey.
              </p>
            </div>

            <button className="rounded-2xl bg-cyan-500 px-6 py-4 font-semibold text-slate-950 hover:bg-cyan-400">
              + Submit New Idea
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Ideas Submitted" value={stats.ideas} />
          <StatCard title="Problems Solved" value={stats.problems} />
          <StatCard title="Solutions" value={stats.solutions} />
          <StatCard title="Total Votes" value={stats.votes} />
        </section>

        {/* Main Grid */}
        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Activity */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Activity</h2>

              <button className="text-sm text-cyan-400 hover:text-cyan-300">
                View All
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {activities.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                >
                  <p className="text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Rank Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm uppercase tracking-wide text-slate-400">
              Global Ranking
            </p>

            <h2 className="mt-3 text-6xl font-bold text-cyan-400">#7</h2>

            <p className="mt-2 text-slate-400">
              You are among the top creators this week.
            </p>

            <button className="mt-6 w-full rounded-2xl bg-cyan-500 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
              View Leaderboard
            </button>
          </div>
        </section>

        {/* Top Ideas */}
        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl font-bold">Top Performing Ideas</h2>

            <button className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-cyan-400 hover:text-cyan-300">
              Manage Ideas
            </button>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {topIdeas.map((idea, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5 transition hover:border-cyan-400"
              >
                <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                  {idea.status}
                </span>

                <h3 className="mt-4 text-xl font-bold">{idea.title}</h3>

                <div className="mt-5 flex items-end justify-between">
                  <div>
                    <p className="text-sm text-slate-400">AI Score</p>
                    <h4 className="text-3xl font-bold text-cyan-400">
                      {idea.score}
                    </h4>
                  </div>

                  <button className="rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-cyan-500 hover:text-slate-950">
                    Open
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Cards */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <QuickCard
            title="Badges Earned"
            value="6"
            desc="Unlock more by staying active."
          />

          <QuickCard
            title="Mentor Reviews"
            value="12"
            desc="Experts reviewed your work."
          />

          <QuickCard
            title="Success Rate"
            value="89%"
            desc="High acceptance performance."
          />
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm uppercase tracking-wide text-slate-400">{title}</p>
      <h3 className="mt-3 text-4xl font-bold text-cyan-400">{value}</h3>
    </div>
  );
}

function QuickCard({ title, value, desc }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400">
      <p className="text-sm text-slate-400">{title}</p>

      <h3 className="mt-3 text-5xl font-bold text-cyan-400">{value}</h3>

      <p className="mt-3 text-slate-400">{desc}</p>
    </div>
  );
}