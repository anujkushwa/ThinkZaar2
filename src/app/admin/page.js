"use client";

import { useState } from "react";

export default function AdminPage() {
  const [stats] = useState({
    users: 1240,
    problems: 342,
    solutions: 517,
    reports: 12,
  });

  const recentUsers = [
    { name: "Anuj", role: "Student", joined: "Today" },
    { name: "Rahul", role: "Innovator", joined: "1 day ago" },
    { name: "Priya", role: "Mentor", joined: "2 days ago" },
    { name: "Vikas", role: "Admin", joined: "3 days ago" },
  ];

  const recentProblems = [
    "Traffic congestion in smart cities",
    "Affordable AI education platform",
    "Rural healthcare access issue",
    "Waste management automation",
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
              ThinkZaar Admin
            </p>
            <h1 className="mt-2 text-4xl font-bold">Admin Dashboard</h1>
            <p className="mt-2 text-slate-400">
              Manage users, monitor activity, and control platform data.
            </p>
          </div>

          <button className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
            Add New Admin
          </button>
        </div>

        {/* Stats */}
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Users" value={stats.users} />
          <StatCard title="Problems Posted" value={stats.problems} />
          <StatCard title="Solutions Submitted" value={stats.solutions} />
          <StatCard title="Reports Pending" value={stats.reports} />
        </section>

        {/* Main Grid */}
        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Users */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Recent Users</h2>
              <button className="text-sm text-cyan-400 hover:text-cyan-300">
                View All
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-slate-800 text-sm text-slate-400">
                  <tr>
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Role</th>
                    <th className="pb-3">Joined</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {recentUsers.map((user, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-800 last:border-none"
                    >
                      <td className="py-4">{user.name}</td>
                      <td className="py-4 text-cyan-400">{user.role}</td>
                      <td className="py-4 text-slate-400">{user.joined}</td>
                      <td className="py-4">
                        <button className="rounded-lg bg-slate-800 px-3 py-1 text-sm hover:bg-cyan-500 hover:text-slate-950">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Problems */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="text-2xl font-semibold">Latest Problems</h2>

            <div className="mt-6 space-y-4">
              {recentProblems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                >
                  <p className="text-sm text-slate-300">{item}</p>

                  <button className="mt-3 text-sm text-cyan-400 hover:text-cyan-300">
                    Review →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Actions */}
        <section className="mt-10 grid gap-6 md:grid-cols-3">
          <ActionCard
            title="User Management"
            desc="Ban, promote or edit users."
          />
          <ActionCard
            title="Content Review"
            desc="Approve or reject submissions."
          />
          <ActionCard
            title="Reports Center"
            desc="Handle abuse and spam reports."
          />
        </section>
      </div>
    </main>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <p className="text-sm uppercase tracking-wide text-slate-400">{title}</p>
      <h3 className="mt-3 text-4xl font-bold text-cyan-400">{value}</h3>
    </div>
  );
}

function ActionCard({ title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-cyan-400">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-slate-400">{desc}</p>

      <button className="mt-5 rounded-xl bg-slate-800 px-4 py-2 text-sm hover:bg-cyan-500 hover:text-slate-950">
        Open
      </button>
    </div>
  );
}