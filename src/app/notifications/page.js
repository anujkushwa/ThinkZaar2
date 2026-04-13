"use client";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "Your solution got approved",
      time: "2 min ago",
      type: "success",
    },
    {
      id: 2,
      title: "New vote received on your idea",
      time: "15 min ago",
      type: "info",
    },
    {
      id: 3,
      title: "Problem deadline ending soon",
      time: "1 hour ago",
      type: "warning",
    },
    {
      id: 4,
      title: "Mentor reviewed your submission",
      time: "Today",
      type: "success",
    },
  ];

  const colorStyle = {
    success: "bg-green-500/15 text-green-400",
    info: "bg-cyan-500/15 text-cyan-400",
    warning: "bg-yellow-500/15 text-yellow-400",
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">
            ThinkZaar
          </p>

          <h1 className="mt-3 text-4xl font-bold">Notifications</h1>

          <p className="mt-3 text-slate-400">
            Stay updated with your latest activity.
          </p>
        </div>

        {/* Notification List */}
        <div className="mt-8 space-y-4">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${colorStyle[item.type]}`}
                  >
                    {item.type}
                  </span>

                  <p className="text-lg">{item.title}</p>
                </div>

                <p className="text-sm text-slate-400 whitespace-nowrap">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-8">
          <button className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
            Mark All as Read
          </button>
        </div>
      </div>
    </main>
  );
}