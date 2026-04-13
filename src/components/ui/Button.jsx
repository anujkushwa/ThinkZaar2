"use client";

export function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  onClick,
  disabled = false,
}) {
  const styles = {
    primary:
      "bg-cyan-500 text-slate-950 hover:bg-cyan-400",
    secondary:
      "border border-slate-700 text-white hover:border-cyan-400 hover:text-cyan-300",
    danger:
      "bg-red-500 text-white hover:bg-red-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-5 py-3 font-semibold transition ${
        styles[variant]
      } ${fullWidth ? "w-full" : ""} ${
        disabled ? "cursor-not-allowed opacity-60" : ""
      }`}
    >
      {children}
    </button>
  );
};