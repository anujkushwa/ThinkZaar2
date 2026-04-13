"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const ROLES = [
  {
    id: "solver",
    title: "Solver (User)",
    desc: "Submit solutions, vote, collaborate, and earn points.",
  },
  {
    id: "mentor",
    title: "Mentor (Expert)",
    desc: "Review solutions, provide feedback, and help rank submissions.",
  },
];

export default function RoleOnboardingPage() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();
  const [role, setRole] = useState("solver");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) router.replace("/sign-in");

    const existingRole = user?.publicMetadata?.role;
    if (existingRole === "admin") router.replace("/admin/dashboard");
    else if (existingRole === "mentor") router.replace("/mentor/dashboard");
    else if (existingRole === "solver") router.replace("/dashboard");
  }, [isLoaded, isSignedIn, router, user]);

  async function save() {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/users/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to update role");
      }

      if (role === "mentor") router.replace("/mentor/dashboard");
      else router.replace("/dashboard");
    } catch (e) {
      setError(e?.message || "Failed to update role");
    } finally {
      setSaving(false);
    }
  }

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            ThinkZaar Onboarding
          </p>
          <h1 className="mt-3 text-4xl font-bold">Choose your role</h1>
          <p className="mt-3 text-slate-400">
            You can change this later (admin can also assign roles).
          </p>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
              {error}
            </div>
          )}

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={[
                  "rounded-3xl border p-6 text-left transition",
                  role === r.id
                    ? "border-cyan-400 bg-slate-950"
                    : "border-slate-800 bg-slate-900 hover:border-slate-700",
                ].join(" ")}
              >
                <h2 className="text-xl font-semibold">{r.title}</h2>
                <p className="mt-2 text-slate-400">{r.desc}</p>
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Continue"}
            </button>
            <button
              type="button"
              onClick={() => router.replace("/dashboard")}
              className="rounded-2xl border border-slate-700 px-8 py-4 font-semibold hover:border-cyan-400 hover:text-cyan-300"
            >
              Skip for now
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

