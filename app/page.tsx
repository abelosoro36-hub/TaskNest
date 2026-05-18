"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════
   NAVBAR  (inlined — no import needed)
═══════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Tasks",        href: "#tasks"        },
  { label: "Pricing",      href: "/pricing"      },
  { label: "FAQ",          href: "#faq"          },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b1426]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">
            TN
          </span>
          <span className="text-white font-bold text-lg tracking-tight">
            Task<span className="text-[#00d4a3]">Nest</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="text-sm font-medium text-slate-300 hover:text-[#00d4a3] transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] px-5 py-2 rounded-lg transition-all duration-200"
          >
            Sign Up Free
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span className={`block h-0.5 w-5 bg-white transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${menuOpen ? "w-0 opacity-0" : "w-5"}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#0b1426]/98 backdrop-blur-md border-t border-white/10 ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block text-slate-300 hover:text-[#00d4a3] font-medium py-3 px-3 rounded-lg hover:bg-white/5 transition-all"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-3 border-t border-white/10 flex flex-col gap-2 mt-1">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block text-center text-slate-300 hover:text-white font-medium py-2.5 px-3 rounded-lg border border-white/20 hover:border-white/40 transition-all"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="block text-center font-semibold bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] py-2.5 px-3 rounded-lg transition-all"
            >
              Sign Up Free
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════
   FOOTER  (inlined — no import needed)
═══════════════════════════════════════════ */

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Platform: [
    { label: "How It Works",   href: "#how-it-works" },
    { label: "Task Catalog",   href: "#tasks"        },
    { label: "Pricing",        href: "/pricing"      },
    { label: "Dashboard",      href: "/dashboard"    },
  ],
  Company: [
    { label: "About Us",       href: "#" },
    { label: "Blog",           href: "#" },
    { label: "Careers",        href: "#" },
    { label: "Contact",        href: "#" },
  ],
  Support: [
    { label: "FAQ",            href: "#faq" },
    { label: "Help Center",    href: "#"    },
    { label: "Privacy Policy", href: "#"    },
    { label: "Terms of Use",   href: "#"    },
  ],
};

function Footer() {
  return (
    <footer className="bg-[#060d1a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">
                TN
              </span>
              <span className="text-white font-bold text-lg">
                Task<span className="text-[#00d4a3]">Nest</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The professional platform to earn real income from high-quality remote tasks — on your schedule, from anywhere.
            </p>
            <div className="flex gap-3 mt-5">
              {["T", "L", "I"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="h-9 w-9 rounded-lg bg-white/5 hover:bg-[#00d4a3]/20 border border-white/10 hover:border-[#00d4a3]/40 flex items-center justify-center transition-all duration-200"
                >
                  <span className="text-slate-400 text-xs font-bold">{s}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">{group}</h4>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-slate-400 hover:text-[#00d4a3] text-sm transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} TaskNest. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#00d4a3] animate-pulse" />
            <span className="text-slate-400 text-sm">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PAGE DATA
═══════════════════════════════════════════ */

const STATS = [
  { value: "12,400+", label: "Active Workers"    },
  { value: "$3.2M+",  label: "Total Paid Out"    },
  { value: "98%",     label: "Satisfaction Rate" },
  { value: "48 hrs",  label: "Avg. First Payout" },
];

const STEPS = [
  {
    step: "01", icon: "👤",
    title: "Create Your Free Account",
    desc:  "Sign up in under 60 seconds. No credit card required. Access your personal dashboard immediately.",
  },
  {
    step: "02", icon: "💳",
    title: "Choose Your Plan",
    desc:  "Unlock tasks with our $20 Basic plan or go Premium at $100/month for the highest-paying opportunities.",
  },
  {
    step: "03", icon: "💰",
    title: "Complete Tasks & Earn",
    desc:  "Pick tasks that suit your skills, complete them at your own pace, and receive direct payments.",
  },
];

const TASKS = [
  {
    category: "Data Review",    title: "E-commerce Product Categorisation",
    pay: "$8 – $15",            duration: "20–30 min",
    difficulty: "Beginner",     available: 12,  tag: "basic",
    desc: "Review and label product listings for accuracy and category alignment.",
  },
  {
    category: "AI Training",    title: "Conversational AI Annotation",
    pay: "$18 – $35",           duration: "45–60 min",
    difficulty: "Intermediate", available: 6,   tag: "basic",
    desc: "Rate and annotate AI dialogue samples for tone, safety, and quality.",
  },
  {
    category: "Image Labeling", title: "Medical Image Classification",
    pay: "$40 – $80",           duration: "1–2 hrs",
    difficulty: "Advanced",     available: 4,   tag: "premium",
    desc: "Classify medical imagery for an AI diagnostic research project.",
  },
  {
    category: "Content QA",     title: "Multilingual Content Review",
    pay: "$25 – $50",           duration: "30–45 min",
    difficulty: "Intermediate", available: 8,   tag: "premium",
    desc: "Verify translations and flag culturally sensitive or inaccurate content.",
  },
  {
    category: "Video Labeling", title: "Autonomous Driving Scene Tagging",
    pay: "$60 – $120",          duration: "2–3 hrs",
    difficulty: "Advanced",     available: 3,   tag: "premium",
    desc: "Label road scenes and objects for self-driving AI model training data.",
  },
  {
    category: "Survey",         title: "Brand Perception Study",
    pay: "$5 – $10",            duration: "10–15 min",
    difficulty: "Beginner",     available: 20,  tag: "basic",
    desc: "Share honest opinions on consumer brands through a structured survey.",
  },
];

const TESTIMONIALS = [
  {
    name: "Amara K.",   role: "Premium Member · Nairobi",   avatar: "AK", stars: 5,
    quote: "I was skeptical at first but within my first week I had earned over $420. The tasks are clear, the pay is fast, and support is excellent.",
  },
  {
    name: "Diego R.",   role: "Basic Member · Manila",      avatar: "DR", stars: 5,
    quote: "Started with the Basic plan to test it out. Made back my $20 in a single afternoon. Upgrading to Premium next month for sure.",
  },
  {
    name: "Priya M.",   role: "Premium Member · Bangalore", avatar: "PM", stars: 5,
    quote: "The premium AI annotation tasks pay extremely well. I work around my full-time job and pull in $200–$350 on weekends alone.",
  },
];

const FAQS = [
  {
    q: "Is signing up really free?",
    a: "Yes, 100%. Creating your TaskNest account costs nothing. You only pay when you're ready to access live tasks (Basic $20/mo or Premium $100/mo).",
  },
  {
    q: "How and when do I get paid?",
    a: "Payments are processed within 48 hours of task approval via bank transfer, PayPal, or Wise. Most workers see their first payment within 2 days.",
  },
  {
    q: "What's the difference between Basic and Premium?",
    a: "Basic ($20/mo) gives you access to entry-level and intermediate tasks. Premium ($100/mo) unlocks all tasks including high-value advanced projects that can pay $300+ per day.",
  },
  {
    q: "Do I need special skills or qualifications?",
    a: "No degree required. Many tasks only need a smartphone and internet connection. Advanced tasks may require specific language skills or attention to detail.",
  },
  {
    q: "Can I cancel my subscription anytime?",
    a: "Absolutely. Cancel anytime from your dashboard. No hidden fees, no long-term commitments.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-[#f59e0b] fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Navbar />

      {/* ── HERO ── */}
      <section className="hero-bg grid-overlay relative overflow-hidden min-h-screen flex items-center pt-16">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#00d4a3]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#f59e0b]/6 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
              <span className="animate-fade-up inline-flex items-center gap-2 bg-[#00d4a3]/10 border border-[#00d4a3]/25 text-[#00d4a3] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00d4a3] animate-pulse" />
                Now open worldwide
              </span>

              <h1 className="animate-fade-up-1 text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                Earn Real Income
                <br />
                <span className="shimmer-text">From Home.</span>
              </h1>

              <p className="animate-fade-up-2 text-slate-400 text-lg leading-relaxed max-w-lg mb-10">
                TaskNest connects you with carefully selected, fairly priced remote tasks.
                Sign up free — unlock tasks from just{" "}
                <span className="text-white font-semibold">$20/month</span>, and premium
                members earn{" "}
                <span className="text-[#00d4a3] font-semibold">$300+ per day</span>.
              </p>

              <div className="animate-fade-up-3 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/signup"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 shadow-lg shadow-[#00d4a3]/25 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start for Free
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/pricing"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:bg-white/5"
                >
                  View Plans
                </Link>
              </div>

              <p className="animate-fade-up-4 mt-5 text-slate-500 text-sm">
                ✓ No credit card to sign up &nbsp;·&nbsp; ✓ Cancel anytime &nbsp;·&nbsp; ✓ Payout in 48 hrs
              </p>
            </div>

            {/* Floating earnings card */}
            <div className="hidden lg:flex flex-col gap-5 items-end animate-float">
              <div className="w-80 bg-[#101d35] border border-white/10 rounded-2xl p-6 shadow-2xl glow-border">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-slate-400 text-sm font-medium">Today&apos;s Earnings</span>
                  <span className="bg-[#00d4a3]/15 text-[#00d4a3] text-xs font-semibold px-2.5 py-1 rounded-full">Live</span>
                </div>
                <p className="text-4xl font-black text-white mb-1">$342.50</p>
                <p className="text-[#00d4a3] text-sm font-medium">↑ +12% from yesterday</p>
                <div className="mt-5 space-y-3">
                  {[
                    { task: "AI Annotation batch",  pay: "+$85.00",  time: "2h ago" },
                    { task: "Medical Image review", pay: "+$120.00", time: "4h ago" },
                    { task: "Content QA (FR/EN)",   pay: "+$47.50",  time: "6h ago" },
                  ].map(({ task, pay, time }) => (
                    <div key={task} className="flex items-center justify-between py-2.5 border-b border-white/[0.08] last:border-0">
                      <div>
                        <p className="text-white text-sm font-medium leading-tight">{task}</p>
                        <p className="text-slate-500 text-xs mt-0.5">{time}</p>
                      </div>
                      <span className="text-[#00d4a3] text-sm font-bold">{pay}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#101d35] border border-white/10 rounded-xl px-4 py-3 shadow-lg">
                <div className="flex -space-x-2">
                  {["#e74c3c", "#3498db", "#9b59b6"].map((c, i) => (
                    <span
                      key={i}
                      className="h-7 w-7 rounded-full border-2 border-[#101d35] flex items-center justify-center text-xs text-white font-bold"
                      style={{ background: c }}
                    >
                      {["A", "B", "C"][i]}
                    </span>
                  ))}
                </div>
                <p className="text-slate-300 text-sm">
                  <span className="text-white font-semibold">38 workers</span> earned today
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#0b1426] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-black text-[#00d4a3] mb-1">{value}</p>
                <p className="text-slate-400 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">
              Simple Process
            </span>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0b1426] tracking-tight">
              Start Earning in 3 Steps
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
              No lengthy onboarding. No complicated setup. Just sign up, choose your plan, and get to work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-14 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-[#00d4a3]/30 via-[#00d4a3]/60 to-[#00d4a3]/30" />
            {STEPS.map(({ step, title, desc, icon }) => (
              <div key={step} className="relative bg-[#f8fafc] rounded-2xl p-8 border border-slate-100 card-hover">
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0b1426] text-2xl shadow-lg">
                    {icon}
                  </div>
                  <span className="text-5xl font-black text-slate-100 leading-none select-none">{step}</span>
                </div>
                <h3 className="text-xl font-bold text-[#0b1426] mb-3">{title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TASK PREVIEW ── */}
      <section id="tasks" className="py-24 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">
                Available Tasks
              </span>
              <h2 className="text-4xl font-black text-[#0b1426]">Real Tasks, Real Pay</h2>
              <p className="mt-2 text-slate-500 max-w-md">
                A curated selection — fewer tasks, better quality, fairer pricing.
              </p>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 inline-flex items-center gap-2 bg-[#0b1426] hover:bg-[#152236] text-white font-semibold px-5 py-3 rounded-xl text-sm transition-all"
            >
              Unlock All Tasks →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TASKS.map((t) => (
              <div key={t.title} className="bg-white rounded-2xl border border-slate-200 p-6 card-hover relative overflow-hidden">
                {t.tag === "premium" && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center rounded-2xl">
                    <div className="bg-[#f59e0b]/15 border border-[#f59e0b]/30 rounded-xl px-4 py-3 text-center">
                      <span className="text-2xl">🔒</span>
                      <p className="text-[#0b1426] font-bold text-sm mt-1">Premium Only</p>
                      <Link href="/pricing" className="inline-block mt-2 text-xs font-semibold text-[#f59e0b] hover:underline">
                        Upgrade →
                      </Link>
                    </div>
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-semibold text-[#00d4a3] bg-[#00d4a3]/10 px-2.5 py-1 rounded-full">
                    {t.category}
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${t.tag === "premium" ? "bg-[#f59e0b]/15 text-[#f59e0b]" : "bg-slate-100 text-slate-500"}`}>
                    {t.tag === "premium" ? "⭐ Premium" : "Basic"}
                  </span>
                </div>
                <h3 className="font-bold text-[#0b1426] text-base mb-2 leading-tight">{t.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{t.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-lg font-black text-[#0b1426]">{t.pay}</p>
                    <p className="text-slate-400 text-xs">{t.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-semibold ${t.difficulty === "Beginner" ? "text-emerald-600" : t.difficulty === "Intermediate" ? "text-blue-600" : "text-purple-600"}`}>
                      {t.difficulty}
                    </p>
                    <p className="text-slate-400 text-xs">{t.available} slots left</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING SUMMARY ── */}
      <section className="py-24 bg-[#0b1426]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">Pricing</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white">Choose Your Plan</h2>
            <p className="mt-4 text-slate-400 max-w-lg mx-auto">
              Start free. Upgrade only when you&apos;re ready. Every plan pays for itself fast.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Free */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wide mb-2">Free</p>
              <p className="text-4xl font-black text-white mb-1">$0</p>
              <p className="text-slate-500 text-sm mb-6">Forever free</p>
              <ul className="space-y-3 mb-8">
                {["Account & profile", "Dashboard access", "Task catalog preview", "Community forums"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-slate-300 text-sm">
                    <svg className="h-4 w-4 text-[#00d4a3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
                {["Task access", "Earnings"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-slate-600 text-sm line-through">
                    <svg className="h-4 w-4 text-slate-700 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-white/10 hover:bg-white/15 text-white font-semibold py-3 rounded-xl transition-all text-sm">
                Sign Up Free
              </Link>
            </div>

            {/* Basic */}
            <div className="bg-white/5 border border-[#00d4a3]/40 rounded-2xl p-8 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00d4a3] text-[#0b1426] text-xs font-black px-4 py-1 rounded-full">
                POPULAR
              </span>
              <p className="text-[#00d4a3] text-sm font-semibold uppercase tracking-wide mb-2">Basic</p>
              <p className="text-4xl font-black text-white mb-1">$20</p>
              <p className="text-slate-500 text-sm mb-6">per month</p>
              <ul className="space-y-3 mb-8">
                {["Everything in Free", "Entry & intermediate tasks", "Earn $30–$80/day", "Payments within 48 hrs", "Email support"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-slate-200 text-sm">
                    <svg className="h-4 w-4 text-[#00d4a3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold py-3 rounded-xl transition-all text-sm shadow-lg shadow-[#00d4a3]/20">
                Get Basic — $20/mo
              </Link>
            </div>

            {/* Premium */}
            <div className="bg-gradient-to-b from-[#1a1200] to-[#0b1426] border border-[#f59e0b]/40 rounded-2xl p-8 relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f59e0b] text-[#0b1426] text-xs font-black px-4 py-1 rounded-full">
                MAX EARNINGS
              </span>
              <p className="text-[#f59e0b] text-sm font-semibold uppercase tracking-wide mb-2">Premium</p>
              <p className="text-4xl font-black text-white mb-1">$100</p>
              <p className="text-slate-500 text-sm mb-6">per month</p>
              <ul className="space-y-3 mb-8">
                {["Everything in Basic", "All task categories", "Earn $300+/day", "Priority task allocation", "Payments within 24 hrs", "Priority support", "Early access to new tasks"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-slate-200 text-sm">
                    <svg className="h-4 w-4 text-[#f59e0b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup" className="block text-center bg-[#f59e0b] hover:bg-[#e08e00] text-[#0b1426] font-bold py-3 rounded-xl transition-all text-sm shadow-lg shadow-[#f59e0b]/20">
                Go Premium — $100/mo
              </Link>
            </div>
          </div>
          <p className="text-center text-slate-500 text-sm mt-8">
            All plans include a 7-day money-back guarantee. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">Real Members</span>
            <h2 className="text-4xl font-black text-[#0b1426]">What Our Workers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, quote, stars, avatar }) => (
              <div key={name} className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-7 card-hover">
                <StarRating count={stars} />
                <p className="mt-4 text-slate-600 leading-relaxed text-sm mb-6">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-[#0b1426] flex items-center justify-center text-[#00d4a3] font-black text-sm">
                    {avatar}
                  </div>
                  <div>
                    <p className="text-[#0b1426] font-bold text-sm">{name}</p>
                    <p className="text-slate-400 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-[#f1f5f9]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">FAQ</span>
            <h2 className="text-4xl font-black text-[#0b1426]">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="bg-white border border-slate-200 rounded-2xl p-6 card-hover">
                <h3 className="font-bold text-[#0b1426] mb-2">{q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="hero-bg grid-overlay py-24 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
          <div className="h-[600px] w-[600px] rounded-full border-2 border-[#00d4a3]" />
        </div>
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-5 leading-tight">
            Ready to Start Earning?
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join over 12,000 workers who&apos;ve already discovered the freedom of TaskNest.
            Sign up is completely free — upgrade only when you&apos;re ready.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-black px-10 py-4 rounded-xl text-lg transition-all shadow-xl shadow-[#00d4a3]/25 hover:scale-[1.03] active:scale-[0.98]"
          >
            Create Free Account
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <p className="mt-4 text-slate-500 text-sm">Free forever · No credit card · Cancel anytime</p>
        </div>
      </section>

      <Footer />
    </>
  );
}