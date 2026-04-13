// src/app/problem/[id]/loading.js

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="h-4 w-40 rounded bg-slate-800" />
          <div className="mt-5 h-12 w-3/4 rounded bg-slate-800" />
          <div className="mt-4 h-4 w-full rounded bg-slate-800" />
          <div className="mt-3 h-4 w-5/6 rounded bg-slate-800" />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="h-24 rounded-2xl bg-slate-800" />
            <div className="h-24 rounded-2xl bg-slate-800" />
            <div className="h-24 rounded-2xl bg-slate-800" />
          </div>

          <div className="mt-8 h-12 w-44 rounded-2xl bg-slate-800" />
        </div>
      </div>
    </main>
  );
}