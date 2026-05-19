"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
 
/* ── Navbar ─────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Tasks",        href: "/#tasks"        },
    { label: "Pricing",      href: "/pricing"       },
    { label: "FAQ",          href: "/faq"           },
  ];
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0b1426]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">TN</span>
          <span className="text-white font-bold text-lg">Task<span className="text-[#00d4a3]">Nest</span></span>
        </Link>
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => <li key={l.label}><Link href={l.href} className="text-sm font-medium text-slate-300 hover:text-[#00d4a3] transition-colors">{l.label}</Link></li>)}
        </ul>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login"  className="text-sm text-slate-300 hover:text-white px-4 py-2">Log In</Link>
          <Link href="/signup" className="text-sm font-semibold bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] px-5 py-2 rounded-lg transition-all">Sign Up Free</Link>
        </div>
        <button onClick={() => setOpen(v => !v)} className="md:hidden flex flex-col gap-[5px] p-2">
          <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ${open ? "w-0 opacity-0" : "w-5"}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-[#0b1426]/98 border-t border-white/10 ${open ? "max-h-96" : "max-h-0"}`}>
        <ul className="px-4 py-4 flex flex-col gap-1">
          {links.map(l => <li key={l.label}><Link href={l.href} onClick={() => setOpen(false)} className="block text-slate-300 hover:text-[#00d4a3] py-3 px-3 rounded-lg">{l.label}</Link></li>)}
          <li className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <Link href="/login"  onClick={() => setOpen(false)} className="block text-center text-slate-300 py-2.5 rounded-lg border border-white/20">Log In</Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="block text-center font-semibold bg-[#00d4a3] text-[#0b1426] py-2.5 rounded-lg">Sign Up Free</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
 
/* ── Footer ─────────────────────────────── */
function Footer() {
  const cols = {
    Platform: [{ label: "How It Works", href: "/#how-it-works" }, { label: "Task Catalog", href: "/#tasks" }, { label: "Pricing", href: "/pricing" }, { label: "Dashboard", href: "/dashboard" }],
    Company:  [{ label: "About Us", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "Contact", href: "/contact" }],
    Support:  [{ label: "FAQ", href: "/faq" }, { label: "Help Center", href: "#" }, { label: "Privacy Policy", href: "/privacy" }, { label: "Terms of Use", href: "/terms" }],
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
            <p className="text-slate-400 text-sm leading-relaxed">The professional platform to earn real income from remote tasks — on your schedule, from anywhere.</p>
          </div>
          {Object.entries(cols).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">{group}</h4>
              <ul className="space-y-2.5">{items.map(i => <li key={i.label}><Link href={i.href} className="text-slate-400 hover:text-[#00d4a3] text-sm transition-colors">{i.label}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} TaskNest. All rights reserved.</p>
          <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#00d4a3] animate-pulse" /><span className="text-slate-400 text-sm">All systems operational</span></div>
        </div>
      </div>
    </footer>
  );
}
 
/* ═══════════════════════════════════════════════════════════════
   SUPPORT TEAM DATA
   ───────────────────────────────────────────────────────────────
   Photos load from i.pravatar.cc right now.
 
   ┌─────────────────────────────────────────────────────────┐
   │  TO USE YOUR OWN REAL PHOTOS:                            │
   │  1. Save to:  public/support/firstname.jpg (300×300 px)  │
   │  2. Change imageSrc value to "/support/firstname.jpg"    │
   └─────────────────────────────────────────────────────────┘
══════════════════════════════════════════════════════════════ */
const SUPPORT_TEAM = [
  {
    name:     "Sarah Mbeki",
    role:     "Community & Support Lead",
    bio:      "5 years in worker support. Sarah handles escalations, community questions, and makes sure every issue is resolved with care.",
    imageSrc: "https://i.pravatar.cc/300?img=56",
    /* ← swap to "/support/sarah.jpg" once you have the real photo */
    response: "≤ 2 hrs",
  },
  {
    name:     "James Okonkwo",
    role:     "Senior Support Specialist",
    bio:      "Billing, payouts, and account issues are James's speciality. He's resolved over 4,000 tickets with a 99% satisfaction rating.",
    imageSrc: "https://i.pravatar.cc/300?img=22",
    /* ← swap to "/support/james.jpg" */
    response: "≤ 3 hrs",
  },
  {
    name:     "Lena Schulz",
    role:     "Technical Support",
    bio:      "Lena handles all platform and technical questions — from login issues to task submission errors. Fast, thorough, and friendly.",
    imageSrc: "https://i.pravatar.cc/300?img=48",
    /* ← swap to "/support/lena.jpg" */
    response: "≤ 4 hrs",
  },
];
 
/* ── FAQ content ─────────────────────────── */
const FAQ_CATEGORIES = [
  {
    category: "Getting Started", icon: "🚀",
    items: [
      { q: "Is signing up really free?",               a: "Yes, 100% free. Creating your TaskNest account costs absolutely nothing. You only pay when you're ready to access live tasks — Basic at $20/mo or Premium at $100/mo." },
      { q: "How do I create an account?",              a: "Click 'Sign Up Free' at the top of the page. Fill in your name, email, and a password. That's it — your dashboard is ready instantly." },
      { q: "Do I need special skills?",                a: "No degree required. Many tasks only need a smartphone and internet connection. Advanced tasks will clearly state any specific skills required." },
      { q: "What countries can join?",                 a: "TaskNest is open to workers in 40+ countries. You can see the full list in your dashboard after signing up." },
    ],
  },
  {
    category: "Plans & Pricing", icon: "💳",
    items: [
      { q: "What is the difference between Basic and Premium?", a: "Basic ($20/mo) unlocks entry-level and intermediate tasks where you can earn $30–$80 per day. Premium ($100/mo) unlocks all task categories including advanced tasks where members earn $300+ per day." },
      { q: "Can I cancel my subscription anytime?",            a: "Absolutely. Cancel anytime from your dashboard settings. No hidden fees, no long-term contracts, no questions asked." },
      { q: "Is there a money-back guarantee?",                 a: "Yes. Both Basic and Premium plans come with a 7-day money-back guarantee. Email support and we'll refund in full." },
      { q: "Can I upgrade from Basic to Premium mid-month?",   a: "Yes. Upgrade anytime from your dashboard. You'll be charged a prorated amount for the remainder of the billing period." },
    ],
  },
  {
    category: "Payments & Payouts", icon: "💰",
    items: [
      { q: "How and when do I get paid?",          a: "Payments are processed within 48 hours (Basic) or 24 hours (Premium) of task approval via bank transfer, PayPal, or Wise." },
      { q: "What is the minimum payout amount?",   a: "The minimum payout is $10. Once your balance reaches $10, you can request a payout anytime from your dashboard." },
      { q: "Are there any fees on payouts?",       a: "TaskNest does not charge payout fees. Your payment provider (PayPal, Wise, or bank) may charge small transfer fees depending on your country." },
      { q: "How do I track my earnings?",          a: "Your dashboard shows a real-time earnings tracker, breakdown by task, and full payment history. You can download an earnings report for tax purposes." },
    ],
  },
  {
    category: "Tasks", icon: "📋",
    items: [
      { q: "How are tasks assigned?",                   a: "Basic and intermediate tasks are available first-come, first-served. Premium members receive priority allocation and see new tasks first with more slots reserved." },
      { q: "What happens if my task is rejected?",      a: "You'll receive clear feedback explaining why. Most rejections can be resubmitted once corrected within 24 hours at no penalty." },
      { q: "How many tasks can I do per day?",          a: "There is no hard limit. Premium members typically have access to 3–8 tasks per day depending on current supply." },
      { q: "Can I choose which tasks I do?",            a: "Yes. You browse available tasks in your dashboard and claim the ones you want. You're never assigned a task without choosing it first." },
    ],
  },
];
 
/* ── Accordion ───────────────────────────── */
function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-xl overflow-hidden transition-all ${open ? "border-[#00d4a3]/40 shadow-sm" : "border-slate-200"}`}>
      <button onClick={() => setOpen(v => !v)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors">
        <span className="font-semibold text-[#0b1426] text-sm pr-4">{q}</span>
        <span className={`text-[#00d4a3] text-xl font-bold shrink-0 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <div className="px-5 pb-4 text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-3">{a}</div>}
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   PAGE
═══════════════════════════════════════════ */
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Getting Started");
 
  return (
    <>
      <Navbar />
 
      {/* ── Hero ── */}
      <section className="hero-bg grid-overlay pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-4">Help Centre</span>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
            Frequently Asked<br /><span className="shimmer-text">Questions.</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Everything you need to know about TaskNest. Can&apos;t find your answer? Our team is happy to help.
          </p>
        </div>
      </section>
 
      {/* ── Support Team ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">Real People, Real Help</span>
            <h2 className="text-3xl font-black text-[#0b1426]">Meet Our Support Team</h2>
            <p className="mt-2 text-slate-500 max-w-lg mx-auto text-sm">
              You&apos;re not talking to a bot. Every support message is handled by a real person on our team.
            </p>
          </div>
 
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {SUPPORT_TEAM.map(({ name, role, bio, imageSrc, response }) => (
              <div key={name} className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-6 card-hover text-center group">
 
                {/* ── Photo ── */}
                <div className="flex justify-center mb-4">
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden shadow-md ring-2 ring-transparent group-hover:ring-[#00d4a3]/40 transition-all duration-300">
                    <Image
                      src={imageSrc}
                      alt={`Photo of ${name}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                </div>
 
                {/* ── Info ── */}
                <h3 className="font-black text-[#0b1426] mb-0.5">{name}</h3>
                <p className="text-[#00d4a3] text-xs font-bold uppercase tracking-wide mb-2">{role}</p>
                <p className="text-slate-500 text-xs leading-relaxed mb-3">{bio}</p>
 
                {/* Response badge */}
                <div className="inline-flex items-center gap-1.5 bg-[#00d4a3]/10 border border-[#00d4a3]/20 rounded-full px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00d4a3] animate-pulse" />
                  <span className="text-[#00d4a3] text-xs font-semibold">Avg reply {response}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* ── FAQ Accordion ── */}
      <section className="py-16 bg-[#f1f5f9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#0b1426]">Common Questions</h2>
          </div>
 
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {FAQ_CATEGORIES.map(({ category, icon }) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === category ? "bg-[#0b1426] text-white" : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"}`}
              >
                <span>{icon}</span>{category}
              </button>
            ))}
          </div>
 
          {FAQ_CATEGORIES.filter(c => c.category === activeCategory).map(({ items }) => (
            <div key={activeCategory} className="space-y-3">
              {items.map(({ q, a }) => <AccordionItem key={q} q={q} a={a} />)}
            </div>
          ))}
        </div>
      </section>
 
      {/* ── CTA ── */}
      <section className="py-14 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-[#0b1426] mb-3">Still have a question?</h2>
          <p className="text-slate-500 mb-6">Our support team is online and ready to help. Most messages are answered within 4 hours.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-[#0b1426] hover:bg-[#152236] text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition-all">
            Contact Support →
          </Link>
        </div>
      </section>
 
      <Footer />
    </>
  );
}