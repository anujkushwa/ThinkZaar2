"use client";

export function Modal({
  isOpen,
  onClose,
  title = "Modal Title",
  children,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{title}</h2>

          <button
            onClick={onClose}
            className="text-slate-400 transition hover:text-red-400"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="mt-5 text-slate-300">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-cyan-500 px-5 py-2 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};