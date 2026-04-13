// src/app/profile/page.js
"use client";

export default function ProfilePage() {
  const user = {
    name: "Anuj Kushwaha",
    role: "Innovator",
    email: "anuj@example.com",
    points: 9850,
    rank: "#7",
    joined: "Jan 2026",
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {/* Avatar */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-cyan-500 text-3xl font-bold text-slate-950">
              A
            </div>

            {/* Info */}
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
                ThinkZaar Profile
              </p>

              <h1 className="mt-2 text-4xl font-bold">{user.name}</h1>

              <p className="mt-2 text-slate-400">{user.role}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card title="Points" value={user.points} />
            <Card title="Global Rank" value={user.rank} />
            <Card title="Joined" value={user.joined} />
          </div>

          {/* Details */}
          <div className="mt-8 rounded-2xl bg-slate-950 p-6">
            <p className="text-sm text-slate-400">Email</p>
            <p className="mt-1 text-lg">{user.email}</p>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
              Edit Profile
            </button>

            <button className="rounded-xl border border-slate-700 px-6 py-3 hover:border-cyan-400 hover:text-cyan-300">
              Share Profile
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-2 text-3xl font-bold text-cyan-400">{value}</h3>
    </div>
  );
}