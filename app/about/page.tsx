"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
 
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
    { label: "Tasks", href: "/#tasks" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/faq" },
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
          <Link href="/login" className="text-sm text-slate-300 hover:text-white px-4 py-2">Log In</Link>
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
            <Link href="/login" onClick={() => setOpen(false)} className="block text-center text-slate-300 py-2.5 rounded-lg border border-white/20">Log In</Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="block text-center font-semibold bg-[#00d4a3] text-[#0b1426] py-2.5 rounded-lg">Sign Up Free</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
 
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
 
/* ══════════════════════════════════════════════════════
   TEAM DATA
   ─────────────────────────────────────────────────────
   HOW TO ADD A REAL PHOTO FOR ANY TEAM MEMBER:
   1. Save the image to:  public/team/firstname.jpg
      (recommended size: 400 × 400 px, square crop)
   2. In the object below, change:
         imageSrc: null
      to:
         imageSrc: "/team/firstname.jpg"
   The coloured initials avatar disappears automatically
   and the real photo renders in its place.
══════════════════════════════════════════════════════ */
const TEAM = [
  { name: "Marcus Ellis",  role: "Co-Founder & CEO",         bio: "Former product lead at a Fortune 500 tech company. Built TaskNest to democratise access to remote income globally.",                         imageSrc: null as string | null, initials: "ME", color: "#3b82f6" },
  { name: "Aisha Osei",   role: "Co-Founder & COO",         bio: "10+ years in remote workforce development. Passionate about creating fair, accessible earning opportunities worldwide.",                     imageSrc: null as string | null, initials: "AO", color: "#8b5cf6" },
  { name: "Daniel Krause",role: "Head of Engineering",       bio: "Full-stack engineer with a background in fintech. Ensures every task payout is fast, secure, and reliable.",                               imageSrc: null as string | null, initials: "DK", color: "#00d4a3" },
  { name: "Priya Nair",   role: "Head of Task Quality",      bio: "Curates every task on the platform to ensure fair pay, clear instructions, and a great worker experience.",                                imageSrc: null as string | null, initials: "PN", color: "#f59e0b" },
  { name: "Leo Ferreira", role: "Growth & Partnerships",     bio: "Connects TaskNest with global enterprise clients who need high-quality human-reviewed data at scale.",                                      imageSrc: null as string | null, initials: "LF", color: "#ef4444" },
  { name: "Sarah Mbeki",  role: "Community & Support Lead",  bio: "Leads the worker success team. If you've ever emailed support and received a warm, helpful reply — it was probably Sarah.",               imageSrc: null as string | null, initials: "SM", color: "#ec4899" },
];
 
const VALUES = [
  { emoji: "⚖️", title: "Fair Pay",       desc: "Every task is reviewed to ensure it pays a fair rate for the time and skill required. No undercutting, ever." },
  { emoji: "🌍", title: "Global Access",  desc: "We actively build for workers in emerging markets. Great opportunities shouldn't be geography-gated."           },
  { emoji: "🔒", title: "Trust & Safety", desc: "Secure payments, transparent task requirements, and a support team that always has your back."                  },
  { emoji: "⚡", title: "Fast Payouts",   desc: "Basic members paid within 48 hrs, Premium within 24 hrs. Your money, on time, every time."                     },
];
 
export default function AboutPage() {
  return (
    <>
      <Navbar />
 
      {/* Hero */}
      <section className="hero-bg grid-overlay pt-32 pb-20 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#00d4a3]/10 blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-4">Our Story</span>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-6">
            Built for Workers,<br /><span className="shimmer-text">By Workers.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            TaskNest was founded in 2022 with a single belief: talented people everywhere deserve access to
            well-paying remote work — without the noise, the scams, or the unfair rates.
          </p>
        </div>
      </section>
 
      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">Our Mission</span>
              <h2 className="text-4xl font-black text-[#0b1426] mb-5 leading-tight">Making remote income accessible to everyone, everywhere.</h2>
              <p className="text-slate-500 leading-relaxed mb-4">We partner with enterprises, research institutions, and AI companies that need high-quality human judgment — and route that work to our community of skilled remote workers at fair, transparent rates.</p>
              <p className="text-slate-500 leading-relaxed">No opaque algorithms. No race to the bottom on pricing. Just clear tasks, clear pay, and a platform that grows with you.</p>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { value: "2022",    label: "Founded",         color: "text-[#00d4a3]" },
                { value: "12,400+", label: "Active Workers",  color: "text-[#0b1426]" },
                { value: "$3.2M+",  label: "Paid to Workers", color: "text-[#f59e0b]" },
                { value: "40+",     label: "Countries",       color: "text-[#3b82f6]" },
              ].map(({ value, label, color }) => (
                <div key={label} className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-6">
                  <p className={`text-4xl font-black mb-1 ${color}`}>{value}</p>
                  <p className="text-slate-500 text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
 
      {/* Values */}
      <section className="py-20 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">What We Stand For</span>
            <h2 className="text-4xl font-black text-[#0b1426]">Our Core Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl border border-slate-100 p-6 card-hover">
                <div className="text-3xl mb-4">{emoji}</div>
                <h3 className="font-bold text-[#0b1426] mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">The People Behind It</span>
            <h2 className="text-4xl font-black text-[#0b1426]">Meet the Team</h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">A small, remote-first team spread across three continents — all obsessed with making TaskNest the most trusted earning platform on the internet.</p>
          </div>
 
          {/* ┌──────────────────────────────────────────────────────────────┐
              │  TEAM PHOTO INSTRUCTIONS                                      │
              │  ─────────────────────────────────────────────────────────── │
              │  To add a real photo for any person:                          │
              │  1. Save image to:  public/team/firstname.jpg  (400×400 px)   │
              │  2. In TEAM array above, change:  imageSrc: null              │
              │     to:  imageSrc: "/team/firstname.jpg"                      │
              │  The initials avatar hides and the photo appears automatically│
              └──────────────────────────────────────────────────────────────┘ */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM.map(({ name, role, bio, imageSrc, initials, color }) => (
              <div key={name} className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-7 card-hover text-center">
                <div className="flex justify-center mb-5">
                  {imageSrc ? (
                    <div className="relative h-24 w-24 rounded-2xl overflow-hidden shadow-md ring-2 ring-[#00d4a3]/30">
                      <Image src={imageSrc} alt={name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="h-24 w-24 rounded-2xl flex items-center justify-center shadow-md text-white font-black text-2xl" style={{ background: color }}>
                      {initials}
                    </div>
                  )}
                </div>
                <h3 className="font-black text-[#0b1426] text-lg mb-0.5">{name}</h3>
                <p className="text-[#00d4a3] text-xs font-bold uppercase tracking-wide mb-3">{role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* CTA */}
      <section className="hero-bg grid-overlay py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Join Our Growing Community</h2>
          <p className="text-slate-400 mb-8">Thousands of workers trust TaskNest every day. Your next earning opportunity is waiting.</p>
          <Link href="/signup" className="inline-flex items-center gap-2 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-black px-10 py-4 rounded-xl text-base transition-all shadow-xl shadow-[#00d4a3]/25 hover:scale-[1.03]">
            Get Started Free →
          </Link>
        </div>
      </section>
 
      <Footer />
    </>
  );
}