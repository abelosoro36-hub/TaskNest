"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    agreed: false,
  });
  const [step,    setStep]    = useState<"form" | "success">("form");
  const [loading, setLoading] = useState(false);
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim())  e.lastName  = "Last name is required";
    if (!form.email.includes("@")) e.email = "Valid email is required";
    if (form.password.length < 8)  e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match";
    if (!form.agreed) e.agreed = "Please accept the terms";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400)); // simulate API
    setLoading(false);
    setStep("success");
  };

  const update = (field: string, value: string | boolean) =>
    setForm((p) => ({ ...p, [field]: value }));

  /* ── Success state ── */
  if (step === "success") {
    return (
      <div className="min-h-screen hero-bg grid-overlay flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center animate-fade-up">
          <div className="h-16 w-16 rounded-full bg-[#00d4a3]/15 flex items-center justify-center mx-auto mb-5">
            <svg className="h-8 w-8 text-[#00d4a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-[#0b1426] mb-2">
            Welcome to TaskNest, {form.firstName}!
          </h2>
          <p className="text-slate-500 mb-8">
            Your free account is ready. Choose a plan to start completing tasks and earning.
          </p>
          <Link
            href="/pricing"
            className="block bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-[#00d4a3]/20 mb-3"
          >
            Choose a Plan →
          </Link>
          <Link href="/dashboard" className="block text-sm text-slate-400 hover:text-slate-600 transition-colors">
            Explore dashboard first
          </Link>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="min-h-screen hero-bg grid-overlay flex">

      {/* Left panel — visible on lg+ */}
      <div className="hidden lg:flex flex-col justify-between w-[44%] p-14 relative">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">
            TN
          </span>
          <span className="text-white font-bold text-xl">
            Task<span className="text-[#00d4a3]">Nest</span>
          </span>
        </Link>

        <div>
          <div className="inline-flex items-center gap-2 bg-[#00d4a3]/10 border border-[#00d4a3]/20 text-[#00d4a3] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4a3] animate-pulse" />
            Free to join
          </div>
          <h2 className="text-5xl font-black text-white leading-tight mb-4">
            Start earning<br />
            <span className="shimmer-text">from day one.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            Create your free account in seconds. No credit card needed until you're ready to access tasks.
          </p>

          {/* Mini stats */}
          <div className="space-y-3">
            {[
              { emoji: "✅", text: "Completely free to sign up" },
              { emoji: "🔒", text: "Your data is secure and private" },
              { emoji: "💸", text: "Payouts within 48 hours" },
              { emoji: "🌍", text: "Open to workers worldwide" },
            ].map(({ emoji, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="text-xl">{emoji}</span>
                <p className="text-slate-300 text-sm">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating card */}
        <div className="bg-[#101d35] border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-1">
            <div className="h-9 w-9 rounded-full bg-[#0b1426] flex items-center justify-center font-black text-[#00d4a3] text-xs">
              PM
            </div>
            <div>
              <p className="text-white text-sm font-semibold">Priya M.</p>
              <p className="text-slate-400 text-xs">Premium · Bangalore</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm italic">
            &ldquo;Made $280 on my first full day. The tasks are clear and the pay is real.&rdquo;
          </p>
        </div>
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
            <h1 className="text-3xl font-black text-[#0b1426]">Create your account</h1>
            <p className="text-slate-500 mt-1.5">
              Free forever. No credit card required.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>

            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Jane"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className={`w-full border ${errors.firstName ? "border-red-400 bg-red-50" : "border-slate-200"} rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all`}
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className={`w-full border ${errors.lastName ? "border-red-400 bg-red-50" : "border-slate-200"} rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all`}
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                placeholder="jane@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={`w-full border ${errors.email ? "border-red-400 bg-red-50" : "border-slate-200"} rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                className={`w-full border ${errors.password ? "border-red-400 bg-red-50" : "border-slate-200"} rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wide">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={(e) => update("confirm", e.target.value)}
                className={`w-full border ${errors.confirm ? "border-red-400 bg-red-50" : "border-slate-200"} rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all`}
              />
              {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.agreed}
                  onChange={(e) => update("agreed", e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#00d4a3]"
                />
                <span className="text-slate-500 text-sm">
                  I agree to TaskNest's{" "}
                  <a href="#" className="text-[#00d4a3] hover:underline">Terms of Service</a> and{" "}
                  <a href="#" className="text-[#00d4a3] hover:underline">Privacy Policy</a>
                </span>
              </label>
              {errors.agreed && <p className="text-red-500 text-xs mt-1 ml-7">{errors.agreed}</p>}
            </div>

            {/* Submit */}
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
                  Creating account…
                </>
              ) : (
                "Create Free Account →"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-slate-500 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#00d4a3] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}