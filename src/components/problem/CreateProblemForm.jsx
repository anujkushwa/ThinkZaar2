"use client";

import { useState } from "react";

export function CreateProblemForm() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
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
      alert("Problem Submitted Successfully 🚀");
      setLoading(false);
      setForm({
        title: "",
        category: "",
        description: "",
      });
    }, 1200);
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
      <h2 className="text-2xl font-bold text-white">Create Problem</h2>
      <p className="mt-2 text-slate-400">
        Submit real-world problems for innovators to solve.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Problem Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

        <input
          type="text"
          name="category"
          placeholder="Category (Health, Tech, Education...)"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

        <textarea
          rows="5"
          name="description"
          placeholder="Describe the problem..."
          value={form.description}
          onChange={handleChange}
          required
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-cyan-500 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Problem"}
        </button>
      </form>
    </div>
  );
}