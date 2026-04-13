"use client";

import { useUser } from "@clerk/nextjs";

export default function MentorDashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            Mentor Workspace
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Mentor Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-slate-400">
            Review solutions, guide users, and help ideas reach production.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-slate-400 text-sm">Signed in as</p>
            <p className="mt-1 text-lg font-semibold">
              {user?.fullName || "Mentor"}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

