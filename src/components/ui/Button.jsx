export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`rounded-full bg-slate-900 px-4 py-2 text-sm text-white ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
