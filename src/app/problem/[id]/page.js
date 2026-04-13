// src/app/problem/[id]/page.js

"use client";

export default function ProblemDetailPage({ params }) {
  const { id } = params;

  const problem = {
    id,
    title: "Traffic Congestion in Smart Cities",
    category: "Transport",
    status: "Open",
    reward: "₹25,000",
    applicants: 42,
    createdAt: "12 Apr 2026",
    deadline: "30 Apr 2026",
    author: "ThinkZaar Team",
    description:
      "Urban cities face increasing traffic congestion due to poor signal management, route planning, and real-time coordination. Build an innovative solution using AI, IoT, analytics, or automation to optimize traffic movement and reduce waiting time.",
    requirements: [
      "Scalable architecture",
      "Modern UI dashboard",
      "AI / ML preferred",
      "Real-time analytics",
    ],
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-green-500/15 px-3 py-1 text-sm font-semibold text-green-400">
              {problem.status}
            </span>

            <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-300">
              {problem.category}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            {problem.title}
          </h1>

          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-slate-400">
            {problem.description}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <InfoCard label="Reward" value={problem.reward} />
            <InfoCard label="Applicants" value={problem.applicants} />
            <InfoCard label="Created" value={problem.createdAt} />
            <InfoCard label="Deadline" value={problem.deadline} />
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 hover:bg-cyan-400">
              Submit Solution
            </button>

            <button className="rounded-2xl border border-slate-700 px-8 py-4 hover:border-cyan-400 hover:text-cyan-300">
              Save Problem
            </button>
          </div>
        </section>

        {/* Requirements + Owner */}
        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Requirements */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold">Requirements</h2>

            <div className="mt-5 space-y-4">
              {problem.requirements.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-slate-950 p-4 text-slate-300"
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </div>

          {/* Owner */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Posted By</h2>

            <div className="mt-5 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-2xl font-bold text-slate-950">
                T
              </div>

              <div>
                <h3 className="text-xl font-semibold">{problem.author}</h3>
                <p className="text-slate-400">Official Creator</p>
              </div>
            </div>

            <button className="mt-6 w-full rounded-2xl border border-slate-700 py-3 hover:border-cyan-400 hover:text-cyan-300">
              View Profile
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <h3 className="mt-2 text-xl font-bold text-cyan-400">{value}</h3>
    </div>
  );
}