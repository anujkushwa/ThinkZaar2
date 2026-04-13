"use client";

import { useState } from "react";

export function SubmitSolutionForm() {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    link: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      alert("Solution Submitted Successfully 🚀");
      setLoading(false);

      setForm({
        title: "",
        summary: "",
        link: "",
      });
    }, 1200);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white">Submit Solution</h2>
      <p className="mt-2 text-slate-400">
        Share your idea, prototype, or final solution.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Solution Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

        <textarea
          rows="5"
          name="summary"
          placeholder="Describe your solution..."
          value={form.summary}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

        <input
          type="url"
          name="link"
          placeholder="Project Link / GitHub / Demo URL"
          value={form.link}
          onChange={handleChange}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Solution"}
        </button>
      </form>
    </div>
  );
};
