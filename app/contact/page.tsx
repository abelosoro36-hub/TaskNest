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
 
const CONTACT_METHODS = [
  { emoji: "📧", label: "General Enquiries", value: "hello@tasknest.io",            note: "We reply within 24 hrs"      },
  { emoji: "🛠️", label: "Worker Support",   value: "support@tasknest.io",           note: "We reply within 4 hrs"       },
  { emoji: "🤝", label: "Partnerships",     value: "partnerships@tasknest.io",      note: "Enterprise & data clients"   },
  { emoji: "📰", label: "Press & Media",    value: "press@tasknest.io",             note: "Media kit available on request" },
];
 
export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };
 
  return (
    <>
      <Navbar />
 
      {/* Hero */}
      <section className="hero-bg grid-overlay pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-4">Get in Touch</span>
          <h1 className="text-5xl font-black text-white mb-4">
            We&apos;d Love to <span className="shimmer-text">Hear From You.</span>
          </h1>
          <p className="text-slate-400 text-lg">Our team is friendly, fast, and genuinely helpful. Reach out any time.</p>
        </div>
      </section>
 
      <section className="py-16 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
 
            {/* Contact methods */}
            <div className="space-y-5">
              <h2 className="text-2xl font-black text-[#0b1426] mb-6">Contact Information</h2>
              {CONTACT_METHODS.map(({ emoji, label, value, note }) => (
                <div key={label} className="bg-white border border-slate-200 rounded-2xl p-5 flex items-start gap-4 card-hover">
                  <div className="text-2xl mt-0.5">{emoji}</div>
                  <div>
                    <p className="text-xs font-bold text-[#00d4a3] uppercase tracking-wide mb-0.5">{label}</p>
                    <a href={`mailto:${value}`} className="text-[#0b1426] font-semibold hover:text-[#00d4a3] transition-colors">{value}</a>
                    <p className="text-slate-400 text-xs mt-0.5">{note}</p>
                  </div>
                </div>
              ))}
 
              <div className="bg-[#0b1426] rounded-2xl p-6 mt-4">
                <p className="text-white font-bold mb-1">Response Times</p>
                <div className="space-y-2 mt-3">
                  {[["Worker support", "≤ 4 hours"], ["General", "≤ 24 hours"], ["Partnerships", "1–2 business days"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-slate-400">{k}</span>
                      <span className="text-[#00d4a3] font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
 
            {/* Form */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8">
              {sent ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-10">
                  <div className="h-16 w-16 rounded-full bg-[#00d4a3]/15 flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-[#00d4a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                  </div>
                  <h3 className="text-xl font-black text-[#0b1426] mb-2">Message Sent!</h3>
                  <p className="text-slate-500">Thanks, {form.name}. We&apos;ll get back to you at {form.email} within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-black text-[#0b1426] mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Full Name</label>
                        <input type="text" placeholder="Jane Doe" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Email</label>
                        <input type="email" placeholder="jane@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Subject</label>
                      <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0b1426] focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all bg-white">
                        <option value="">Select a subject…</option>
                        <option>Worker Support</option>
                        <option>Billing / Payments</option>
                        <option>Partnership Enquiry</option>
                        <option>Press / Media</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Message</label>
                      <textarea rows={5} placeholder="Tell us how we can help…" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all resize-none" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-[#00d4a3] hover:bg-[#00c494] disabled:opacity-70 text-[#0b1426] font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#00d4a3]/20 text-sm">
                      {loading ? (<><svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>Sending…</>) : "Send Message →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
 
      <Footer />
    </>
  );
}