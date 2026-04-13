"use client";

import { useMemo, useState } from "react";

export default function MyProblemsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const problems = [
    {
      id: 1,
      title: "Traffic Congestion in Smart Cities",
      category: "Transport",
      status: "Open",
      reward: "₹25,000",
      applicants: 42,
      createdAt: "12 Apr 2026",
      deadline: "30 Apr 2026",
      description:
        "Need scalable smart traffic optimization solution using AI + sensors.",
    },
    {
      id: 2,
      title: "Affordable AI Education Platform",
      category: "Education",
      status: "In Review",
      reward: "Internship + ₹10,000",
      applicants: 31,
      createdAt: "10 Apr 2026",
      deadline: "28 Apr 2026",
      description:
        "Build low-cost adaptive learning platform for tier-2 students.",
    },
    {
      id: 3,
      title: "Rural Healthcare Access Problem",
      category: "Healthcare",
      status: "Closed",
      reward: "₹50,000",
      applicants: 67,
      createdAt: "05 Apr 2026",
      deadline: "20 Apr 2026",
      description:
        "Find telemedicine and medicine distribution model for villages.",
    },
    {
      id: 4,
      title: "Waste Management Automation",
      category: "Environment",
      status: "Open",
      reward: "₹18,000",
      applicants: 22,
      createdAt: "14 Apr 2026",
      deadline: "05 May 2026",
      description:
        "Smart segregation and route optimization system for waste pickup.",
    },
  ];

  const filteredProblems = useMemo(() => {
    return problems.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "All" ? true : item.status === filter;

      return matchSearch && matchFilter;
    });
  }, [search, filter]);

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
                My Problems
              </h1>

              <p className="mt-3 max-w-3xl text-slate-400">
                Manage all challenges you created, monitor submissions, and
                track progress in one place.
              </p>
            </div>

            <button className="rounded-2xl bg-cyan-500 px-6 py-4 font-semibold text-slate-950 hover:bg-cyan-400">
              + Create New Problem
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Problems" value="12" />
          <StatCard title="Open Challenges" value="7" />
          <StatCard title="Total Applicants" value="162" />
          <StatCard title="Completed" value="3" />
        </section>

        {/* Search + Filter */}
        <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            >
              <option>All</option>
              <option>Open</option>
              <option>In Review</option>
              <option>Closed</option>
            </select>

            <button className="rounded-2xl border border-slate-700 px-4 py-3 hover:border-cyan-400 hover:text-cyan-300">
              Export Data
            </button>
          </div>
        </section>

        {/* Problems Grid */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {filteredProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </section>

        {/* Empty State */}
        {filteredProblems.length === 0 && (
          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">
            <h3 className="text-2xl font-bold">No Problems Found</h3>
            <p className="mt-3 text-slate-400">
              Try different search or filter options.
            </p>
          </div>
        )}
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

function ProblemCard({ problem }) {
  const badgeStyle = {
    Open: "bg-green-500/15 text-green-400",
    "In Review": "bg-yellow-500/15 text-yellow-400",
    Closed: "bg-red-500/15 text-red-400",
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            badgeStyle[problem.status]
          }`}
        >
          {problem.status}
        </span>

        <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs text-cyan-300">
          {problem.category}
        </span>
      </div>

      <h2 className="mt-4 text-2xl font-bold">{problem.title}</h2>

      <p className="mt-3 text-slate-400">{problem.description}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Mini label="Reward" value={problem.reward} />
        <Mini label="Applicants" value={problem.applicants} />
        <Mini label="Created" value={problem.createdAt} />
        <Mini label="Deadline" value={problem.deadline} />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
          View Submissions
        </button>

        <button className="rounded-2xl border border-slate-700 px-5 py-3 hover:border-cyan-400 hover:text-cyan-300">
          Edit Problem
        </button>

        <button className="rounded-2xl border border-red-500/40 px-5 py-3 text-red-400 hover:bg-red-500/10">
          Delete
        </button>
      </div>
    </div>
  );
}

function Mini({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <h4 className="mt-1 font-semibold text-cyan-400">{value}</h4>
    </div>
  );
}