"use client";

import { useEffect, useMemo, useState } from "react";

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [error, setError] = useState("");

  const colorStyle = {
    success: "bg-green-500/15 text-green-400",
    info: "bg-cyan-500/15 text-cyan-400",
    warning: "bg-yellow-500/15 text-yellow-400",
    error: "bg-red-500/15 text-red-400",
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (cancelled) return;
        setItems(data?.data ?? []);
        setUnread(data?.unread ?? 0);
      } catch (e) {
        if (!cancelled) setError("Failed to load notifications");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const hasItems = items.length > 0;

  const unreadCount = useMemo(() => {
    if (!Array.isArray(items)) return unread;
    return items.reduce((sum, n) => sum + (n.is_read ? 0 : 1), 0);
  }, [items, unread]);

  async function markRead(id) {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
      setUnread((prev) => Math.max(0, prev - 1));
    } catch {
      // ignore
    }
  }

  async function markAllRead() {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
      setItems((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnread(0);
    } catch {
      // ignore
    }
  }

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
          {loading && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-slate-400">
              Loading...
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
              {error}
            </div>
          )}

          {!loading && !error && !hasItems && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 text-slate-400">
              No notifications yet.
            </div>
          )}

          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      colorStyle[item.type] || colorStyle.info
                    }`}
                  >
                    {item.type}
                  </span>

                  <div>
                    <p className="text-lg">
                      {item.title}{" "}
                      {!item.is_read && (
                        <span className="ml-2 text-xs text-cyan-300">
                          unread
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {item.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-sm text-slate-400 whitespace-nowrap">
                    {item.created_at
                      ? new Date(item.created_at).toLocaleString()
                      : ""}
                  </p>

                  {!item.is_read && (
                    <button
                      onClick={() => markRead(item.id)}
                      className="rounded-xl border border-slate-700 px-3 py-2 text-xs hover:border-cyan-400 hover:text-cyan-300"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Button */}
        <div className="mt-8">
          <button
            onClick={markAllRead}
            disabled={loading || unreadCount === 0}
            className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 hover:bg-cyan-400 disabled:opacity-60"
          >
            Mark All as Read {unreadCount ? `(${unreadCount})` : ""}
          </button>
        </div>
      </div>
    </main>
  );
}