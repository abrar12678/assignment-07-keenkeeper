import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 py-16">
      <div className="max-w-xl w-full rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl shadow-slate-200/40">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 mb-4">Page not found</p>
        <h1 className="text-5xl font-bold text-slate-900 mb-4">404</h1>
        <p className="text-base text-slate-600 mb-8">
          The page you’re looking for doesn’t exist. Head back to the home page and continue building strong connections.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-[#244D3F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1f4137]"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}