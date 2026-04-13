"use client";

import { useState } from "react";

export default function CreateProblemPage() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    difficulty: "Medium",
    reward: "",
    description: "",
    requirements: "",
    deadline: "",
    constraints: "",
    expectedOutcomes: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Technology",
    "Healthcare",
    "Education",
    "Environment",
    "Agriculture",
    "Transport",
    "Finance",
    "Social Impact",
  ];

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const res = await fetch("/api/problems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          category: form.category,
          difficulty: (form.difficulty || "Easy").toLowerCase(),
          reward: form.reward,
          deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
          constraints: form.constraints || null,
          expected_outcomes: form.expectedOutcomes || null,
          requirements: form.requirements || null,
          tags: [],
        }),
      });

      const data = await res.json();
      if (!res.ok || data?.success === false) {
        throw new Error(data?.message || "Failed to create problem");
      }

      setSuccess(true);
      setForm({
        title: "",
        category: "",
        location: "",
        difficulty: "Medium",
        reward: "",
        description: "",
        requirements: "",
        deadline: "",
        constraints: "",
        expectedOutcomes: "",
      });
    } catch (err) {
      setError(err?.message || "Failed to create problem");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            ThinkZaar Challenge Hub
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Post Problem
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            Post real-world challenges and invite innovators, students,
            developers, and creators to solve them.
          </p>
        </section>

        {/* Success */}
        {success && (
          <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-green-400">
            Problem created successfully 🚀
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
          <div className="grid gap-6 md:grid-cols-2">
            {/* Title */}
            <Field
              label="Problem Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter challenge title"
            />

            {/* Category */}
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Category
              </label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option value="">Select Category</option>

                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <Field
              label="Location"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="India / Global / Remote"
            />

            {/* Difficulty */}
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Difficulty
              </label>

              <select
                name="difficulty"
                value={form.difficulty}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>

            {/* Reward */}
            <Field
              label="Reward / Prize"
              name="reward"
              value={form.reward}
              onChange={handleChange}
              placeholder="₹10,000 / Internship / Certificate"
            />

            {/* Deadline */}
            <Field
              label="Deadline"
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="mb-2 block text-sm text-slate-300">
              Problem Description
            </label>

            <textarea
              rows="6"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Explain the problem in detail..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {/* Requirements */}
          <div className="mt-6">
            <label className="mb-2 block text-sm text-slate-300">
              Requirements / Expectations
            </label>

            <textarea
              rows="4"
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              placeholder="Mention skills, expectations, deliverables..."
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Constraints
              </label>
              <textarea
                rows="4"
                name="constraints"
                value={form.constraints}
                onChange={handleChange}
                placeholder="Budget, time, hardware limits, policies..."
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Expected outcomes
              </label>
              <textarea
                rows="4"
                name="expectedOutcomes"
                value={form.expectedOutcomes}
                onChange={handleChange}
                placeholder="What a good solution should deliver..."
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-cyan-500 px-8 py-4 font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Problem"}
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
  type = "text",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
      />
    </div>
  );
}