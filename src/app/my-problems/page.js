"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { io } from "socket.io-client";

export default function MyProblemsPage() {
  const { user } = useUser();
  const userId = user?.id;

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/problems/my");
        const data = await res.json();
        if (!cancelled) setProblems(data.data || []);
      } catch (err) {
        console.error(err);
        if (!cancelled) setProblems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  // 🔥 REALTIME SOCKET
  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("problemCreated", (newProblem) => {
      setProblems((prev) => [newProblem, ...prev]);
    });

    socket.on("problemDeleted", (id) => {
      setProblems((prev) => prev.filter((p) => p.id !== id));
    });

    return () => socket.disconnect();
  }, []);

  // 🔍 FILTER
  const filteredProblems = useMemo(() => {
    return problems.filter((item) => {
      const matchSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "All" ? true : item.status === filter;

      return matchSearch && matchFilter;
    });
  }, [search, filter, problems]);

  // 🗑 DELETE
  const handleDelete = async (id) => {
    await fetch(`/api/problems/${id}`, {
      method: "DELETE",
    });

    setProblems((prev) => prev.filter((p) => p.id !== id));
  };

  // 📊 STATS
  const total = problems.length;
  const open = problems.filter((p) => p.status === "open").length;
  const closed = problems.filter((p) => p.status === "closed").length;
  const applicants = problems.reduce(
    (sum, p) => sum + (p.applicants || 0),
    0
  );

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <section className="bg-slate-900 p-8 rounded-3xl border border-slate-800">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">My Problems</h1>
              <p className="text-slate-400 mt-2">
                Manage your posts like a creator 🚀
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Total" value={total} />
          <StatCard title="Open" value={open} />
          <StatCard title="Closed" value={closed} />
          <StatCard title="Applicants" value={applicants} />
        </section>

        {/* FILTER */}
        <section className="mt-8 bg-slate-900 p-6 rounded-2xl border border-slate-800 grid md:grid-cols-3 gap-4">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-950 p-3 rounded-xl"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-slate-950 p-3 rounded-xl"
          >
            <option>All</option>
            <option>open</option>
            <option>in_review</option>
            <option>closed</option>
          </select>
        </section>

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-10 text-slate-400">Loading...</p>
        )}

        {/* LIST */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {filteredProblems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              onDelete={handleDelete}
            />
          ))}
        </section>

      </div>
    </main>
  );
}

// 🔥 STAT
function StatCard({ title, value }) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
      <p className="text-slate-400">{title}</p>
      <h3 className="text-3xl font-bold text-cyan-400 mt-2">
        {value}
      </h3>
    </div>
  );
}

// 🔥 CARD (SOCIAL STYLE)
function ProblemCard({ problem, onDelete }) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

      <h2 className="text-xl font-bold">{problem.title}</h2>
      <p className="text-slate-400 mt-2">{problem.description}</p>

      <div className="flex gap-4 mt-4 text-sm text-slate-400">
        <span>💰 {problem.reward}</span>
        <span>👥 {problem.applicants || 0}</span>
      </div>

      <div className="flex gap-3 mt-5">
        <button className="bg-cyan-500 px-4 py-2 rounded-xl text-slate-950">
          View
        </button>

        <button className="border px-4 py-2 rounded-xl">
          Edit
        </button>

        <button
          onClick={() => onDelete(problem.id)}
          className="border border-red-500 text-red-400 px-4 py-2 rounded-xl"
        >
          Delete
        </button>
      </div>

    </div>
  );
}