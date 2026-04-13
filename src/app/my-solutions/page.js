"use client";

export default function MySolutionsPage() {
  const solutions = [
    {
      id: 1,
      title: "AI Traffic Control System",
      problem: "Traffic Congestion",
      status: "Approved",
      votes: 128,
    },
    {
      id: 2,
      title: "Smart Learning Platform",
      problem: "Affordable Education",
      status: "Pending",
      votes: 74,
    },
    {
      id: 3,
      title: "Village Telemedicine App",
      problem: "Rural Healthcare",
      status: "Rejected",
      votes: 39,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            ThinkZaar
          </p>

          <h1 className="mt-3 text-4xl font-bold">My Solutions</h1>

          <p className="mt-3 text-slate-400">
            Manage and track all your submitted solutions.
          </p>
        </div>

        {/* List */}
        <div className="mt-8 space-y-5">
          {solutions.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{item.title}</h2>

                  <p className="mt-2 text-slate-400">
                    Problem: {item.problem}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-cyan-400 font-semibold">
                    {item.status}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {item.votes} Votes
                  </p>
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <button className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-400">
                  View
                </button>

                <button className="rounded-xl border border-slate-700 px-5 py-2 hover:border-cyan-400 hover:text-cyan-300">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}