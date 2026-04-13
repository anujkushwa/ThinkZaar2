"use client";

import { SignUp } from "@clerk/nextjs";
import { useState } from "react";

export default function SignUpPage() {
  const [role, setRole] = useState("solver"); // default role

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        
        {/* Heading */}
        <div className="mb-6 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            ThinkZaar
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white">
            Create Account
          </h1>

          <p className="mt-2 text-slate-400">
            Join builders, creators and innovators today.
          </p>
        </div>

        {/* 🔥 Role Selector */}
        <div className="mb-4">
          <label className="text-sm text-slate-300">Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-2 w-full p-2 rounded-lg bg-slate-800 text-white border border-slate-700"
          >
            <option value="solver">User (Solver)</option>
            <option value="mentor">Expert Mentor</option>
          </select>
        </div>

        {/* Clerk SignUp */}
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          unsafeMetadata={{ role }} // 🔥 store role
          appearance={{
            variables: {
              colorPrimary: "#06b6d4",
              colorBackground: "#0f172a",
              colorText: "#ffffff",
              colorInputText: "#ffffff",
              colorInputBackground: "#020617",
            },
            elements: {
              card: "bg-transparent shadow-none",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              formButtonPrimary:
                "bg-cyan-500 hover:bg-cyan-400 text-slate-950",
            },
          }}
        />
      </div>
    </main>
  );
}