"use client";

export function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-300">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
      />
    </div>
  );
};
