"use client";

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="text-2xl font-semibold text-slate-900">
        Something went wrong
      </h2>
      <p className="max-w-md text-sm text-slate-600">
        {error?.message || "An unexpected error occurred while rendering this page."}
      </p>
      <button
        className="rounded-full bg-slate-900 px-4 py-2 text-sm text-white"
        onClick={() => reset()}
        type="button"
      >
        Try again
      </button>
    </div>
  );
}
