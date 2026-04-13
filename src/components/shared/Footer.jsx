import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">ThinkZaar</h2>
          <p className="mt-3 text-slate-400 leading-relaxed">
            Build, validate and launch ideas with community support and AI.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <div className="mt-4 space-y-2">
            <Link href="/" className="block text-slate-400 hover:text-cyan-400">
              Home
            </Link>
            <Link href="/dashboard" className="block text-slate-400 hover:text-cyan-400">
              Dashboard
            </Link>
            <Link href="/problems" className="block text-slate-400 hover:text-cyan-400">
              Problems
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <p className="mt-4 text-slate-400">support@thinkzaar.com</p>
          <p className="text-slate-400">India</p>
        </div>
      </div>

      <div className="border-t border-slate-800 py-5 text-center text-sm text-slate-500">
        © 2026 ThinkZaar. All rights reserved.
      </div>
    </footer>
  );
}

