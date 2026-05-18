"use client";

import { useState } from "react";
import Link from "next/link";

/* ── Simulated plan state (replace with real auth/session) ── */
type Plan = "free" | "basic" | "premium";

const SIDEBAR_ITEMS = [
  { icon: "🏠", label: "Dashboard",    active: true  },
  { icon: "📋", label: "My Tasks",     active: false },
  { icon: "💰", label: "Earnings",     active: false },
  { icon: "🏆", label: "Leaderboard",  active: false },
  { icon: "⚙️", label: "Settings",    active: false },
];

const TASKS = [
  {
    category:   "Data Review",
    title:      "E-commerce Product Categorisation",
    pay:        "$8 – $15",
    duration:   "20–30 min",
    difficulty: "Beginner",
    plan:       "basic",
    slots:      12,
    desc:       "Review and label product listings for accuracy.",
  },
  {
    category:   "AI Training",
    title:      "Conversational AI Annotation",
    pay:        "$18 – $35",
    duration:   "45–60 min",
    difficulty: "Intermediate",
    plan:       "basic",
    slots:      6,
    desc:       "Rate and annotate AI dialogue for tone and quality.",
  },
  {
    category:   "Survey",
    title:      "Brand Perception Study",
    pay:        "$5 – $10",
    duration:   "10–15 min",
    difficulty: "Beginner",
    plan:       "basic",
    slots:      20,
    desc:       "Share opinions on consumer brands through a structured survey.",
  },
  {
    category:   "Image Labeling",
    title:      "Medical Image Classification",
    pay:        "$40 – $80",
    duration:   "1–2 hrs",
    difficulty: "Advanced",
    plan:       "premium",
    slots:      4,
    desc:       "Classify medical imagery for AI diagnostic research.",
  },
  {
    category:   "Content QA",
    title:      "Multilingual Content Review",
    pay:        "$25 – $50",
    duration:   "30–45 min",
    difficulty: "Intermediate",
    plan:       "premium",
    slots:      8,
    desc:       "Verify translations and flag inaccurate content.",
  },
  {
    category:   "Video Labeling",
    title:      "Autonomous Driving Scene Tagging",
    pay:        "$60 – $120",
    duration:   "2–3 hrs",
    difficulty: "Advanced",
    plan:       "premium",
    slots:      3,
    desc:       "Label road scenes for self-driving AI training data.",
  },
];

export default function DashboardPage() {
  const [plan,        setPlan]        = useState<Plan>("free");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLocked = (taskPlan: string) => {
    if (plan === "free") return true;
    if (plan === "basic" && taskPlan === "premium") return true;
    return false;
  };

  const visibleTasks = TASKS.filter((t) => {
    if (plan === "premium") return true;
    if (plan === "basic")   return t.plan === "basic";
    return false;
  });

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━
          SIDEBAR
      ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0b1426] flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">
              TN
            </span>
            <span className="text-white font-bold text-lg">
              Task<span className="text-[#00d4a3]">Nest</span>
            </span>
          </Link>
        </div>

        {/* Plan badge */}
        <div className="px-4 py-3 mx-4 mt-4 rounded-xl border border-white/10 bg-white/5">
          <p className="text-slate-400 text-xs mb-1.5">Current Plan</p>
          <div className="flex items-center justify-between">
            <span
              className={`text-sm font-bold capitalize ${
                plan === "premium" ? "text-[#f59e0b]"
                : plan === "basic" ? "text-[#00d4a3]"
                : "text-slate-300"
              }`}
            >
              {plan}
            </span>
            {plan !== "premium" && (
              <Link
                href="/pricing"
                className="text-xs text-[#00d4a3] hover:underline font-semibold"
              >
                Upgrade →
              </Link>
            )}
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {SIDEBAR_ITEMS.map(({ icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-[#00d4a3]/15 text-[#00d4a3] border border-[#00d4a3]/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        {/* Demo plan switcher */}
        <div className="p-4 border-t border-white/10">
          <p className="text-slate-500 text-xs mb-2 uppercase tracking-wide font-semibold">
            Demo: Switch Plan
          </p>
          <div className="grid grid-cols-3 gap-1">
            {(["free", "basic", "premium"] as Plan[]).map((p) => (
              <button
                key={p}
                onClick={() => setPlan(p)}
                className={`text-xs py-1.5 rounded-lg font-semibold capitalize transition-all ${
                  plan === p
                    ? "bg-[#00d4a3] text-[#0b1426]"
                    : "bg-white/10 text-slate-400 hover:bg-white/15"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* User */}
        <div className="p-4 border-t border-white/10 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#00d4a3]/20 flex items-center justify-center text-[#00d4a3] font-black text-xs">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">Jane Doe</p>
            <p className="text-slate-500 text-xs truncate">jane@example.com</p>
          </div>
        </div>
      </aside>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━
          MAIN CONTENT
      ━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Open menu"
            >
              <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-black text-[#0b1426]">Dashboard</h1>
              <p className="text-slate-400 text-xs">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-[#f1f5f9] rounded-xl px-4 py-2">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input placeholder="Search tasks…" className="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none w-36" />
            </div>
            <div className="h-9 w-9 rounded-full bg-[#0b1426] flex items-center justify-center text-[#00d4a3] font-black text-xs">
              JD
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 space-y-8">

          {/* ── Upgrade banner (free users) ── */}
          {plan === "free" && (
            <div className="bg-gradient-to-r from-[#0b1426] to-[#152236] border border-[#00d4a3]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🔒</span>
                  <h3 className="text-white font-bold text-lg">Unlock Tasks to Start Earning</h3>
                </div>
                <p className="text-slate-400 text-sm">
                  You're on the free plan. Upgrade to Basic ($20/mo) or Premium ($100/mo) to access tasks and start getting paid.
                </p>
              </div>
              <Link
                href="/pricing"
                className="shrink-0 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold px-6 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap"
              >
                View Plans →
              </Link>
            </div>
          )}

          {/* ── Stats row ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Today's Earnings",
                value: plan === "free" ? "$0.00" : plan === "basic" ? "$47.50" : "$342.50",
                sub:   plan === "free" ? "Upgrade to earn" : "+12% from yesterday",
                color: "text-[#00d4a3]",
              },
              {
                label: "Tasks Completed",
                value: plan === "free" ? "0" : plan === "basic" ? "3" : "12",
                sub:   "This week",
                color: "text-[#0b1426]",
              },
              {
                label: "Pending Payout",
                value: plan === "free" ? "$0.00" : plan === "basic" ? "$87.00" : "$620.00",
                sub:   plan === "free" ? "—" : "Payout in 24 hrs",
                color: "text-[#f59e0b]",
              },
              {
                label: "Tasks Available",
                value: plan === "free" ? "0" : plan === "basic" ? "3" : "6",
                sub:   plan === "free" ? "Unlock with plan" : "Ready to claim",
                color: "text-[#0b1426]",
              },
            ].map(({ label, value, sub, color }) => (
              <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5">
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide mb-3">{label}</p>
                <p className={`text-2xl font-black ${color} mb-0.5`}>{value}</p>
                <p className="text-slate-400 text-xs">{sub}</p>
              </div>
            ))}
          </div>

          {/* ── Task list ── */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black text-[#0b1426]">Available Tasks</h2>
              {plan !== "free" && (
                <span className="text-sm text-slate-400">
                  {visibleTasks.length} task{visibleTasks.length !== 1 ? "s" : ""} available
                </span>
              )}
            </div>

            {plan === "free" ? (
              /* Locked state */
              <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">🔐</div>
                <h3 className="text-xl font-black text-[#0b1426] mb-2">Tasks are locked</h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto text-sm leading-relaxed">
                  Upgrade to the Basic plan ($20/month) to unlock entry and intermediate tasks.
                  Go Premium ($100/month) to access all high-paying advanced tasks.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-lg shadow-[#00d4a3]/20"
                >
                  Unlock Tasks — from $20/mo →
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {TASKS.map((t) => {
                  const locked = isLocked(t.plan);
                  return (
                    <div
                      key={t.title}
                      className={`bg-white rounded-2xl border p-6 relative overflow-hidden transition-all ${
                        locked
                          ? "border-slate-200 opacity-60"
                          : "border-slate-200 card-hover"
                      }`}
                    >
                      {locked && (
                        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl">
                          <div className="text-center">
                            <span className="text-2xl">⭐</span>
                            <p className="text-[#0b1426] font-bold text-xs mt-1">Premium Only</p>
                            <Link href="/pricing" className="text-xs text-[#f59e0b] hover:underline font-semibold">
                              Upgrade →
                            </Link>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start justify-between mb-3">
                        <span className="text-xs font-semibold text-[#00d4a3] bg-[#00d4a3]/10 px-2.5 py-1 rounded-full">
                          {t.category}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                            t.plan === "premium"
                              ? "bg-[#f59e0b]/15 text-[#f59e0b]"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {t.plan === "premium" ? "⭐ Premium" : "Basic"}
                        </span>
                      </div>

                      <h3 className="font-bold text-[#0b1426] text-sm mb-1.5 leading-tight">{t.title}</h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-4">{t.desc}</p>

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div>
                          <p className="text-base font-black text-[#0b1426]">{t.pay}</p>
                          <p className="text-slate-400 text-xs">{t.duration}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-xs font-semibold ${
                              t.difficulty === "Beginner"
                                ? "text-emerald-600"
                                : t.difficulty === "Intermediate"
                                ? "text-blue-600"
                                : "text-purple-600"
                            }`}
                          >
                            {t.difficulty}
                          </p>
                          <p className="text-slate-400 text-xs">{t.slots} slots</p>
                        </div>
                      </div>

                      {!locked && (
                        <button className="mt-4 w-full bg-[#0b1426] hover:bg-[#152236] text-white text-xs font-bold py-2.5 rounded-xl transition-all">
                          Start Task →
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}