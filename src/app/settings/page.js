// src/app/settings/page.js
"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [emailNotify, setEmailNotify] = useState(true);

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            ThinkZaar Preferences
          </p>

          <h1 className="mt-3 text-4xl font-bold">Settings</h1>

          <p className="mt-3 text-slate-400">
            Manage your account preferences and notifications.
          </p>

          {/* Settings Options */}
          <div className="mt-8 space-y-5">
            <ToggleCard
              title="Dark Mode"
              desc="Use dark theme across the platform."
              enabled={darkMode}
              onToggle={() => setDarkMode(!darkMode)}
            />

            <ToggleCard
              title="Email Notifications"
              desc="Receive updates via email."
              enabled={emailNotify}
              onToggle={() => setEmailNotify(!emailNotify)}
            />

            <div className="rounded-2xl bg-slate-950 p-5">
              <p className="text-lg font-semibold">Language</p>

              <select className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-cyan-400">
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>

          {/* Save */}
          <button className="mt-8 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
            Save Changes
          </button>
        </div>
      </div>
    </main>
  );
}

function ToggleCard({ title, desc, enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between rounded-2xl bg-slate-950 p-5">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-slate-400">{desc}</p>
      </div>

      <button
        onClick={onToggle}
        className={`h-8 w-14 rounded-full transition ${
          enabled ? "bg-cyan-500" : "bg-slate-700"
        }`}
      >
        <div
          className={`h-6 w-6 rounded-full bg-white transition ${
            enabled ? "translate-x-7" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}