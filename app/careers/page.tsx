"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
 
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [{ label: "How It Works", href: "/#how-it-works" }, { label: "Tasks", href: "/#tasks" }, { label: "Pricing", href: "/pricing" }, { label: "FAQ", href: "/faq" }];
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0b1426]/95 backdrop-blur-md shadow-lg" : "bg-transparent"}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">TN</span>
          <span className="text-white font-bold text-lg">Task<span className="text-[#00d4a3]">Nest</span></span>
        </Link>
        <ul className="hidden md:flex items-center gap-8">{links.map(l => <li key={l.label}><Link href={l.href} className="text-sm font-medium text-slate-300 hover:text-[#00d4a3] transition-colors">{l.label}</Link></li>)}</ul>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login" className="text-sm text-slate-300 hover:text-white px-4 py-2">Log In</Link>
          <Link href="/signup" className="text-sm font-semibold bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] px-5 py-2 rounded-lg transition-all">Sign Up Free</Link>
        </div>
        <button onClick={() => setOpen(v => !v)} className="md:hidden flex flex-col gap-[5px] p-2">
          <span className={`block h-0.5 w-5 bg-white transition-all ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all ${open ? "w-0 opacity-0" : "w-5"}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
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
            <div key={group}><h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">{group}</h4><ul className="space-y-2.5">{items.map(i => <li key={i.label}><Link href={i.href} className="text-slate-400 hover:text-[#00d4a3] text-sm transition-colors">{i.label}</Link></li>)}</ul></div>
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
 
const ROLES = [
  { title: "Senior Full-Stack Engineer",    team: "Engineering",  type: "Full-time · Remote", desc: "Build and scale the core TaskNest platform. You'll work across our Next.js frontend and Node.js/Python backend."         },
  { title: "Task Quality Analyst",           team: "Operations",   type: "Full-time · Remote", desc: "Review and approve new task submissions from enterprise partners. Ensure every task meets our fairness standards."        },
  { title: "Community Growth Manager",       team: "Growth",       type: "Full-time · Remote", desc: "Grow and engage our global worker community through campaigns, newsletters, and social channels."                         },
  { title: "Enterprise Partnerships Manager",team: "Partnerships", type: "Full-time · Remote", desc: "Source and close deals with enterprises and research institutions that need high-quality annotated data."                  },
  { title: "Content & Blog Writer",          team: "Marketing",    type: "Part-time · Remote", desc: "Write compelling guides, success stories, and platform updates for our blog and email newsletters."                       },
];
 
const PERKS = [
  { emoji: "🌍", title: "Fully Remote",       desc: "Work from anywhere in the world. Always." },
  { emoji: "💸", title: "Competitive Pay",    desc: "Market-rate salaries with equity options."  },
  { emoji: "📅", title: "Flexible Hours",     desc: "We care about output, not clock time."      },
  { emoji: "📚", title: "Learning Budget",    desc: "$1,000/year for courses and conferences."   },
  { emoji: "🏖️", title: "Unlimited PTO",     desc: "Take the time you need, no questions."      },
  { emoji: "🤝", title: "Mission-Driven",     desc: "Your work directly improves livelihoods."   },
];
 
export default function CareersPage() {
  const [applied, setApplied] = useState<string | null>(null);
 
  return (
    <>
      <Navbar />
 
      {/* Hero */}
      <section className="hero-bg grid-overlay pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-4">We&apos;re Hiring</span>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-5">
            Help Us Build the Future<br /><span className="shimmer-text">of Remote Work.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            We&apos;re a small, fully remote team building the fairest remote-work platform on the internet.
            If that excites you — we&apos;d love to hear from you.
          </p>
        </div>
      </section>
 
      {/* Perks */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">Why TaskNest</span>
            <h2 className="text-3xl font-black text-[#0b1426]">What We Offer</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map(({ emoji, title, desc }) => (
              <div key={title} className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-6 card-hover">
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="font-bold text-[#0b1426] mb-1">{title}</h3>
                <p className="text-slate-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* Open roles */}
      <section className="py-16 bg-[#f1f5f9]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">Open Positions</span>
            <h2 className="text-3xl font-black text-[#0b1426]">Current Openings</h2>
          </div>
          <div className="space-y-4">
            {ROLES.map(({ title, team, type, desc }) => (
              <div key={title} className="bg-white border border-slate-200 rounded-2xl p-6 card-hover">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs font-bold text-[#00d4a3] bg-[#00d4a3]/10 px-2.5 py-1 rounded-full">{team}</span>
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{type}</span>
                    </div>
                    <h3 className="font-black text-[#0b1426] text-lg mb-1">{title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                  </div>
                  <button
                    onClick={() => setApplied(title)}
                    className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${applied === title ? "bg-[#00d4a3]/15 text-[#00d4a3] border border-[#00d4a3]/30" : "bg-[#0b1426] hover:bg-[#152236] text-white"}`}
                  >
                    {applied === title ? "✓ Applied!" : "Apply Now"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-8">
            Don&apos;t see your role?{" "}
            <Link href="/contact" className="text-[#00d4a3] hover:underline font-semibold">
              Send us an open application →
            </Link>
          </p>
        </div>
      </section>
 
      <Footer />
    </>
  );
}