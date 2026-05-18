"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [form,    setForm]    = useState({ email: "", password: "", remember: false });
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  const update = (field: string, value: string | boolean) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    // Redirect to dashboard (replace with real auth)
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen hero-bg grid-overlay flex">

      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] p-14">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">
            TN
          </span>
          <span className="text-white font-bold text-xl">
            Task<span className="text-[#00d4a3]">Nest</span>
          </span>
        </Link>

        <div>
          <h2 className="text-5xl font-black text-white leading-tight mb-4">
            Welcome<br />
            <span className="shimmer-text">back.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Log in to your dashboard, pick up tasks, and continue earning from wherever you are.
          </p>

          {/* Live earnings ticker */}
          <div className="bg-[#101d35] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">Live payouts today</p>
              <span className="h-1.5 w-1.5 rounded-full bg-[#00d4a3] animate-pulse" />
            </div>
            {[
              { initials: "AK", pay: "$85.00",  task: "AI Annotation" },
              { initials: "JR", pay: "$120.00", task: "Medical Imaging" },
              { initials: "ML", pay: "$47.50",  task: "Content QA" },
            ].map(({ initials, pay, task }) => (
              <div key={initials} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#0b1426] border border-white/10 flex items-center justify-center text-[#00d4a3] text-xs font-bold">
                  {initials}
                </div>
                <p className="text-slate-300 text-sm flex-1">{task}</p>
                <span className="text-[#00d4a3] text-sm font-bold">{pay}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} TaskNest · All rights reserved
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12 bg-white lg:rounded-l-[2.5rem]">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link href="/" className="flex lg:hidden items-center gap-2 justify-center mb-8">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">
              TN
            </span>
            <span className="text-[#0b1426] font-bold text-xl">
              Task<span className="text-[#00d4a3]">Nest</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black text-[#0b1426]">Log in to TaskNest</h1>
            <p className="text-slate-500 mt-1.5">Enter your credentials to access your dashboard.</p>
          </div>

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-xs text-[#00d4a3] hover:underline font-medium">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                placeholder="Your password"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.remember}
                onChange={(e) => update("remember", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 accent-[#00d4a3]"
              />
              <span className="text-slate-500 text-sm">Remember me for 30 days</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#00d4a3] hover:bg-[#00c494] disabled:opacity-70 text-[#0b1426] font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#00d4a3]/20 text-sm"
            >
              {loading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Log In →"
              )}
            </button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-slate-400 text-xs">or continue with</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {["Google", "Apple"].map((provider) => (
              <button
                key={provider}
                className="flex items-center justify-center gap-2 border border-slate-200 hover:border-slate-300 rounded-xl py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all"
              >
                {provider === "Google" ? (
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                )}
                {provider}
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-slate-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#00d4a3] font-semibold hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}