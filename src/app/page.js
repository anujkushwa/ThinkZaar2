"use client"; // ✅ ADD

import { useRouter } from "next/navigation"; // ✅ ADD

export default function HomePage() {
  const router = useRouter(); // ✅ ADD

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-4xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
            ThinkZaar
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-6xl">
            Build, Validate & Launch{" "}
            <span className="text-cyan-400">Powerful Ideas</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
            ThinkZaar helps creators, students, founders, and innovators turn
            raw ideas into validated opportunities with AI insights, expert
            feedback, and community support.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              onClick={() => router.push("/sign-in")} // ✅ ADD
              className="rounded-xl bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-400"
            >
              Get Started
            </button>

            <button
              onClick={() => router.push("/sign-in")} // ✅ ADD
              className="rounded-xl border border-slate-700 px-6 py-3 font-medium transition hover:border-cyan-400 hover:text-cyan-300"
            >
              Explore Ideas
            </button>
          </div>

          {/* Stats */}
          
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">
            Why Choose ThinkZaar?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
            Everything you need to test, improve, and grow your next big idea.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-semibold text-cyan-400">
                AI Validation
              </h3>
              <p className="mt-3 text-slate-400">
                Get instant feedback on your business ideas, risks, audience,
                and market potential.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-semibold text-cyan-400">
                Community Reviews
              </h3>
              <p className="mt-3 text-slate-400">
                Receive suggestions, ratings, and honest opinions from real
                users and experts.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <h3 className="text-xl font-semibold text-cyan-400">
                Growth Dashboard
              </h3>
              <p className="mt-3 text-slate-400">
                Track performance, votes, traction, and engagement in one clean
                dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}