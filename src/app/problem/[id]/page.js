"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProblemDetailsPage({ params }) {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [problem, setProblem] = useState(null);
  const [solutions, setSolutions] = useState([]);
  const [loadingSolutions, setLoadingSolutions] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/problems/${id}`);
        const data = await res.json();
        if (!cancelled) setProblem(data?.data ?? null);
      } catch {
        if (!cancelled) setProblem(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  useEffect(() => {
    let cancelled = false;

    async function loadSolutions() {
      setLoadingSolutions(true);
      try {
        const res = await fetch(`/api/solutions?problemId=${id}`);
        const data = await res.json();
        if (!cancelled) setSolutions(data?.data ?? []);
      } catch {
        if (!cancelled) setSolutions([]);
      } finally {
        if (!cancelled) setLoadingSolutions(false);
      }
    }

    loadSolutions();
    return () => {
      cancelled = true;
    };
  }, [id]);

  async function vote(solutionId, value) {
    try {
      await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solutionId, value }),
      });

      // refresh votes for that solution (simple + reliable)
      const res = await fetch(`/api/vote/${solutionId}`);
      const data = await res.json();
      const v = data?.data;
      if (!v) return;

      setSolutions((prev) =>
        prev.map((s) =>
          s.id === solutionId
            ? {
                ...s,
                score: v.score,
                upvotes: v.upvotes,
                downvotes: v.downvotes,
                user_vote: v.userVote,
              }
            : s
        )
      );
    } catch {
      // ignore
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl text-slate-400">Loading...</div>
      </main>
    );
  }

  if (!problem) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">Problem not found</h1>
          <p className="mt-3 text-slate-400">
            The problem you’re looking for may have been removed.
          </p>
          <Link
            href="/problems"
            className="mt-6 inline-block rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Back to Problems
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            {problem.category}
          </p>
          <h1 className="mt-3 text-4xl font-bold">{problem.title}</h1>
          <p className="mt-4 text-slate-400">{problem.description}</p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-full bg-slate-950 px-3 py-1 text-slate-300">
              Status: {problem.status}
            </span>
            <span className="rounded-full bg-slate-950 px-3 py-1 text-slate-300">
              Reward: {problem.reward}
            </span>
            <span className="rounded-full bg-slate-950 px-3 py-1 text-slate-300">
              Applicants: {problem.applicants}
            </span>
            <span className="rounded-full bg-slate-950 px-3 py-1 text-slate-300">
              Deadline: {problem.deadline}
            </span>
          </div>
        </header>

        {Array.isArray(problem.requirements) && problem.requirements.length > 0 && (
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
            <h2 className="text-2xl font-bold">Requirements</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-300">
              {problem.requirements.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </section>
        )}

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/submit-solution/${id}`}
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Submit Solution
          </Link>
          <Link
            href="/problems"
            className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white hover:border-cyan-400"
          >
            Back
          </Link>
        </div>

        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">Solutions</h2>
            <span className="text-sm text-slate-400">
              {solutions.length} submitted
            </span>
          </div>

          {loadingSolutions && (
            <div className="mt-6 text-slate-400">Loading solutions...</div>
          )}

          {!loadingSolutions && solutions.length === 0 && (
            <div className="mt-6 text-slate-400">
              No solutions yet. Be the first to submit one.
            </div>
          )}

          <div className="mt-6 space-y-4">
            {solutions.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-slate-800 bg-slate-950 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-400">
                      {s.name || "Anonymous"} • v{s.version || 1}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-slate-200">
                      {s.content}
                    </p>

                    {(s.external_link || s.file_url) && (
                      <div className="mt-3 flex flex-wrap gap-3 text-sm">
                        {s.external_link && (
                          <a
                            href={s.external_link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-300 hover:text-cyan-200"
                          >
                            External link →
                          </a>
                        )}
                        {s.file_url && (
                          <a
                            href={s.file_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-cyan-300 hover:text-cyan-200"
                          >
                            File →
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <button
                      onClick={() => vote(s.id, 1)}
                      className={[
                        "rounded-xl border px-3 py-2 text-sm",
                        s.user_vote === 1
                          ? "border-cyan-400 text-cyan-300"
                          : "border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300",
                      ].join(" ")}
                      aria-label="Upvote"
                    >
                      ▲
                    </button>
                    <div className="text-lg font-bold text-cyan-300">
                      {s.score ?? 0}
                    </div>
                    <button
                      onClick={() => vote(s.id, -1)}
                      className={[
                        "rounded-xl border px-3 py-2 text-sm",
                        s.user_vote === -1
                          ? "border-red-400 text-red-300"
                          : "border-slate-700 text-slate-300 hover:border-red-400 hover:text-red-300",
                      ].join(" ")}
                      aria-label="Downvote"
                    >
                      ▼
                    </button>
                  </div>
                </div>

                {(s.feasibility_score ||
                  s.creativity_score ||
                  s.effectiveness_score) && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <ScorePill label="Feasibility" value={s.feasibility_score} />
                    <ScorePill label="Creativity" value={s.creativity_score} />
                    <ScorePill
                      label="Effectiveness"
                      value={s.effectiveness_score}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ScorePill({ label, value }) {
  if (value === null || value === undefined) return null;
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-bold text-cyan-300">{value}</p>
    </div>
  );
}

