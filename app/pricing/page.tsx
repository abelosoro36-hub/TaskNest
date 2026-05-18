"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════
   NAVBAR  (inlined)
═══════════════════════════════════════════ */

const NAV_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Tasks",        href: "/#tasks"        },
  { label: "Pricing",      href: "/pricing"       },
  { label: "FAQ",          href: "/#faq"          },
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
        <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">TN</span>
          <span className="text-white font-bold text-lg tracking-tight">
            Task<span className="text-[#00d4a3]">Nest</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} className="text-sm font-medium text-slate-300 hover:text-[#00d4a3] transition-colors duration-200">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2">Log In</Link>
          <Link href="/signup" className="text-sm font-semibold bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] px-5 py-2 rounded-lg transition-all">
            Sign Up Free
          </Link>
        </div>

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

      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-[#0b1426]/98 border-t border-white/10 ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <ul className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} onClick={() => setMenuOpen(false)} className="block text-slate-300 hover:text-[#00d4a3] font-medium py-3 px-3 rounded-lg hover:bg-white/5 transition-all">
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-3 border-t border-white/10 flex flex-col gap-2 mt-1">
            <Link href="/login" onClick={() => setMenuOpen(false)} className="block text-center text-slate-300 font-medium py-2.5 px-3 rounded-lg border border-white/20 hover:border-white/40 transition-all">Log In</Link>
            <Link href="/signup" onClick={() => setMenuOpen(false)} className="block text-center font-semibold bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] py-2.5 px-3 rounded-lg transition-all">Sign Up Free</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════
   FOOTER  (inlined)
═══════════════════════════════════════════ */

function Footer() {
  const links: Record<string, { label: string; href: string }[]> = {
    Platform: [
      { label: "How It Works", href: "/#how-it-works" },
      { label: "Task Catalog",  href: "/#tasks"       },
      { label: "Pricing",       href: "/pricing"      },
      { label: "Dashboard",     href: "/dashboard"    },
    ],
    Company: [
      { label: "About Us", href: "#" }, { label: "Blog", href: "#" },
      { label: "Careers",  href: "#" }, { label: "Contact", href: "#" },
    ],
    Support: [
      { label: "FAQ",            href: "/#faq" },
      { label: "Help Center",    href: "#"     },
      { label: "Privacy Policy", href: "#"     },
      { label: "Terms of Use",   href: "#"     },
    ],
  };

  return (
    <footer className="bg-[#060d1a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">TN</span>
              <span className="text-white font-bold text-lg">Task<span className="text-[#00d4a3]">Nest</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              The professional platform to earn real income from high-quality remote tasks — on your schedule, from anywhere.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">{group}</h4>
              <ul className="space-y-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-slate-400 hover:text-[#00d4a3] text-sm transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} TaskNest. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00d4a3] animate-pulse" />
            <span className="text-slate-400 text-sm">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PRICING DATA
═══════════════════════════════════════════ */

const PLANS = [
  {
    id: "free",  name: "Free",    price: "$0",   period: "forever",
    highlight: false, badge: "",
    description: "Get started and explore the platform at no cost.",
    cta: "Sign Up Free", href: "/signup",
    features: {
      "Account & dashboard":        true,
      "Task catalog preview":       true,
      "Community access":           true,
      "Entry-level tasks":          false,
      "Intermediate tasks":         false,
      "Advanced / premium tasks":   false,
      "Earnings per day":           "—",
      "Payout speed":               "—",
      "Priority task allocation":   false,
      "Priority support":           false,
      "Early access to new tasks":  false,
      "Money-back guarantee":       false,
    },
  },
  {
    id: "basic", name: "Basic",   price: "$20",  period: "/month",
    highlight: true, badge: "Most Popular",
    description: "Unlock real tasks and start generating a steady income.",
    cta: "Get Basic", href: "/signup",
    features: {
      "Account & dashboard":        true,
      "Task catalog preview":       true,
      "Community access":           true,
      "Entry-level tasks":          true,
      "Intermediate tasks":         true,
      "Advanced / premium tasks":   false,
      "Earnings per day":           "$30 – $80",
      "Payout speed":               "48 hours",
      "Priority task allocation":   false,
      "Priority support":           false,
      "Early access to new tasks":  false,
      "Money-back guarantee":       "7 days",
    },
  },
  {
    id: "premium", name: "Premium", price: "$100", period: "/month",
    highlight: false, badge: "Max Earnings",
    description: "Maximise your earnings with the highest-paying task pool.",
    cta: "Go Premium", href: "/signup",
    features: {
      "Account & dashboard":        true,
      "Task catalog preview":       true,
      "Community access":           true,
      "Entry-level tasks":          true,
      "Intermediate tasks":         true,
      "Advanced / premium tasks":   true,
      "Earnings per day":           "$300+",
      "Payout speed":               "24 hours",
      "Priority task allocation":   true,
      "Priority support":           true,
      "Early access to new tasks":  true,
      "Money-back guarantee":       "7 days",
    },
  },
];

const FEATURE_KEYS = Object.keys(PLANS[0].features);

function Tick({ ok }: { ok: boolean | string }) {
  if (typeof ok === "string") {
    return <span className="text-sm font-semibold text-[#0b1426]">{ok}</span>;
  }
  return ok ? (
    <svg className="h-5 w-5 text-[#00d4a3] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ) : (
    <svg className="h-4 w-4 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* ═══════════════════════════════════════════
   PRICING PAGE
═══════════════════════════════════════════ */

export default function PricingPage() {
  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="hero-bg grid-overlay pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-4">
            Transparent Pricing
          </span>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-5">
            Simple Plans.<br />
            <span className="shimmer-text">Real Earnings.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Sign up free. Pay only when you&apos;re ready to access tasks.
            Every plan pays for itself on your first day of work.
          </p>
        </div>
      </section>

      {/* ── Plan cards ── */}
      <section className="py-16 bg-[#f1f5f9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col ${
                  plan.highlight
                    ? "bg-[#0b1426] text-white shadow-2xl scale-[1.02] border border-[#00d4a3]/30"
                    : plan.id === "premium"
                    ? "bg-gradient-to-b from-[#1a1200] to-[#0b1426] text-white border border-[#f59e0b]/30 shadow-xl"
                    : "bg-white border border-slate-200 shadow-sm"
                }`}
              >
                {plan.badge && (
                  <span className={`absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-black px-5 py-1.5 rounded-full ${plan.id === "premium" ? "bg-[#f59e0b] text-[#0b1426]" : "bg-[#00d4a3] text-[#0b1426]"}`}>
                    {plan.badge}
                  </span>
                )}

                <p className={`text-sm font-bold uppercase tracking-widest mb-1 ${plan.id === "premium" ? "text-[#f59e0b]" : plan.highlight ? "text-[#00d4a3]" : "text-slate-400"}`}>
                  {plan.name}
                </p>

                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-5xl font-black ${plan.highlight || plan.id === "premium" ? "text-white" : "text-[#0b1426]"}`}>
                    {plan.price}
                  </span>
                  <span className="text-sm pb-2 text-slate-400">{plan.period}</span>
                </div>

                <p className={`text-sm mb-7 leading-relaxed ${plan.highlight || plan.id === "premium" ? "text-slate-400" : "text-slate-500"}`}>
                  {plan.description}
                </p>

                <Link
                  href={plan.href}
                  className={`block text-center font-bold py-3.5 rounded-xl text-sm transition-all mb-7 ${
                    plan.id === "premium"
                      ? "bg-[#f59e0b] hover:bg-[#e08e00] text-[#0b1426] shadow-lg shadow-[#f59e0b]/20"
                      : plan.highlight
                      ? "bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] shadow-lg shadow-[#00d4a3]/20"
                      : "bg-[#0b1426] hover:bg-[#152236] text-white"
                  }`}
                >
                  {plan.cta} →
                </Link>

                <ul className="space-y-3">
                  {FEATURE_KEYS.slice(0, 6).map((key) => {
                    const val = plan.features[key as keyof typeof plan.features];
                    const isActive = val === true || (typeof val === "string" && val !== "—");
                    return (
                      <li key={key} className="flex items-center gap-3">
                        {isActive ? (
                          <svg className="h-4 w-4 text-[#00d4a3] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        ) : (
                          <svg className="h-4 w-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                        <span className={`text-sm ${plan.highlight || plan.id === "premium" ? isActive ? "text-slate-200" : "text-slate-600" : isActive ? "text-slate-700" : "text-slate-400"}`}>
                          {key}{typeof val === "string" && val !== "—" ? ` — ${val}` : ""}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            All paid plans include a 7-day money-back guarantee. Cancel anytime with no questions asked.
          </p>
        </div>
      </section>

      {/* ── Full comparison table ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-[#0b1426] text-center mb-12">Full Feature Comparison</h2>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0b1426]">
                  <th className="text-left py-4 px-6 text-slate-400 font-semibold text-xs uppercase tracking-wide w-[40%]">
                    Feature
                  </th>
                  {PLANS.map((p) => (
                    <th
                      key={p.id}
                      className={`py-4 px-4 text-center font-bold text-sm ${p.id === "premium" ? "text-[#f59e0b]" : p.highlight ? "text-[#00d4a3]" : "text-slate-300"}`}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_KEYS.map((key, i) => (
                  <tr key={key} className={`border-t border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}>
                    <td className="py-4 px-6 text-slate-600 font-medium">{key}</td>
                    {PLANS.map((plan) => (
                      <td key={plan.id} className="py-4 px-4 text-center">
                        <Tick ok={plan.features[key as keyof typeof plan.features]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ strip ── */}
      <section className="py-16 bg-[#f1f5f9]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#0b1426] mb-3">Still have questions?</h2>
          <p className="text-slate-500 mb-6">
            Read our full FAQ or reach out to our support team — we usually reply within 2 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#faq"
              className="inline-flex items-center justify-center gap-2 bg-[#0b1426] hover:bg-[#152236] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all"
            >
              Read FAQ
            </Link>
            <a
              href="mailto:support@tasknest.io"
              className="inline-flex items-center justify-center gap-2 border border-slate-300 hover:border-slate-400 text-[#0b1426] font-semibold px-6 py-3 rounded-xl text-sm transition-all"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}