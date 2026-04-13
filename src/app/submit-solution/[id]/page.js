// src/app/submit-solution/[id]/page.js

"use client";

import { useState } from "react";

export default function SubmitSolutionPage({ params }) {
  const { id } = params;

  const [form, setForm] = useState({
    content: "",
    fileUrl: "",
    externalLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    (async () => {
      try {
        const res = await fetch("/api/solutions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            problemId: id,
            content: form.content,
            fileUrl: form.fileUrl || null,
            externalLink: form.externalLink || null,
          }),
        });

        const data = await res.json();
        if (!res.ok || data?.success === false) {
          throw new Error(data?.message || "Failed to submit solution");
        }

        setSuccess(true);
        setForm({ content: "", fileUrl: "", externalLink: "" });
      } catch (err) {
        setError(err?.message || "Failed to submit solution");
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            ThinkZaar Challenge
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            Submit Solution for Problem #{id}
          </h1>

          <p className="mt-3 text-slate-400">
            Share your project, prototype, research, or innovative solution.
          </p>
        </section>

        {/* Success */}
        {success && (
          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
            Solution submitted successfully 🚀
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8"
        >
          <div className="mt-6">
            <label className="mb-2 block text-sm text-slate-300">Solution</label>

            <textarea
              rows="6"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Explain your solution in detail (approach, feasibility, impact, timeline)..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Field
              label="File URL (optional)"
              name="fileUrl"
              value={form.fileUrl}
              onChange={handleChange}
              placeholder="https://drive.google.com/..."
            />

            <Field
              label="External Link (optional)"
              name="externalLink"
              value={form.externalLink}
              onChange={handleChange}
              placeholder="https://github.com/... or https://demo.com"
            />
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Solution"}
            </button>

            <button
              type="button"
              className="rounded-2xl border border-slate-700 px-8 py-4 hover:border-cyan-400 hover:text-cyan-300"
            >
              Save Draft
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
      />
    </div>
  );
}