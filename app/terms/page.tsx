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
          <span className={`block h-0.5 w-5 bg-white transition-all ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block h-0.5 bg-white transition-all ${open ? "w-0 opacity-0" : "w-5"}`} />
          <span className={`block h-0.5 w-5 bg-white transition-all ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
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
 
const SECTIONS = [
  { title: "1. Acceptance of Terms",         body: "By creating an account or accessing TaskNest, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, do not use our platform. We may update these terms at any time with 14 days notice." },
  { title: "2. Eligibility",                  body: "You must be at least 18 years old to use TaskNest. By using the platform, you represent that you meet this requirement. TaskNest is available to workers in 40+ supported countries — see your dashboard for the full list." },
  { title: "3. Account Registration",         body: "You must provide accurate information when creating your account. You are responsible for maintaining the confidentiality of your password and for all activity under your account. Notify us immediately of any unauthorised use at support@tasknest.io." },
  { title: "4. Subscription Plans",           body: "TaskNest offers Free, Basic ($20/month), and Premium ($100/month) subscription plans. Paid plans are billed monthly. All paid plans include a 7-day money-back guarantee. You may cancel at any time from your dashboard — cancellation takes effect at the end of the current billing period." },
  { title: "5. Task Completion & Quality",    body: "You agree to complete tasks accurately, honestly, and to the best of your ability. Submitting false or low-quality work, using automated tools, or attempting to game the quality system may result in task rejection, account suspension, or permanent termination without refund." },
  { title: "6. Payments & Payouts",           body: "Earnings are credited to your TaskNest balance upon task approval. Payouts are processed within 48 hours (Basic) or 24 hours (Premium) via your chosen method (PayPal, Wise, or bank transfer). The minimum payout amount is $10. TaskNest does not charge payout fees, though your payment provider may." },
  { title: "7. Prohibited Conduct",           body: "You may not use TaskNest for any unlawful purpose; attempt to circumvent our quality systems; create multiple accounts; share account credentials; reverse-engineer the platform; or engage in any fraudulent activity. Violations will result in immediate termination and forfeiture of any pending balance." },
  { title: "8. Intellectual Property",        body: "All content, trademarks, and technology on the TaskNest platform are owned by TaskNest or its licensors. You retain no rights to the platform itself. Work you submit becomes the property of the enterprise client upon approval as stated in each task brief." },
  { title: "9. Limitation of Liability",      body: "TaskNest is provided 'as is'. We do not guarantee the availability of tasks at any time. Our liability is limited to the amount you paid to TaskNest in the 3 months preceding any claim. We are not liable for indirect, incidental, or consequential damages." },
  { title: "10. Termination",                 body: "We may suspend or terminate your account at any time for violation of these terms. You may close your account at any time from your dashboard settings. Upon termination, any approved unpaid balance will be paid out within 14 business days." },
  { title: "11. Governing Law",               body: "These Terms are governed by the laws of the jurisdiction in which TaskNest is incorporated. Any disputes shall be resolved through binding arbitration before resorting to litigation, except where prohibited by local law." },
  { title: "12. Contact",                     body: "For questions about these Terms of Use, contact us at legal@tasknest.io or through our Contact page. We aim to respond within 5 business days." },
];
 
export default function TermsPage() {
  return (
    <>
      <Navbar />
 
      {/* Hero */}
      <section className="hero-bg grid-overlay pt-32 pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-4">Legal</span>
          <h1 className="text-5xl font-black text-white mb-3">Terms of Use</h1>
          <p className="text-slate-400">
            Last updated: <span className="text-slate-300 font-medium">May 1, 2026</span>
          </p>
        </div>
      </section>
 
      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
 
          {/* Intro box */}
          <div className="bg-[#f8fafc] border border-[#00d4a3]/20 rounded-2xl p-6 mb-10">
            <p className="text-slate-600 leading-relaxed text-sm">
              These Terms of Use govern your access to and use of the TaskNest platform (&quot;TaskNest&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              Please read them carefully. By using TaskNest you agree to these terms in full.
            </p>
          </div>
 
          {/* Quick nav */}
          <div className="bg-[#0b1426] rounded-2xl p-5 mb-10">
            <p className="text-white font-bold text-sm mb-3">Quick Navigation</p>
            <div className="grid grid-cols-2 gap-1">
              {SECTIONS.map(s => (
                <a
                  key={s.title}
                  href={`#${s.title.replace(/\s+/g, "-").toLowerCase()}`}
                  className="text-slate-400 hover:text-[#00d4a3] text-xs py-1 transition-colors"
                >
                  → {s.title}
                </a>
              ))}
            </div>
          </div>
 
          {/* Sections */}
          <div className="space-y-8">
            {SECTIONS.map(({ title, body }) => (
              <div
                key={title}
                id={title.replace(/\s+/g, "-").toLowerCase()}
                className="scroll-mt-20"
              >
                <h2 className="text-xl font-black text-[#0b1426] mb-3 pb-2 border-b border-slate-100">
                  {title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
 
          <div className="mt-12 p-5 bg-[#f1f5f9] rounded-2xl text-center">
            <p className="text-slate-500 text-sm">
              Questions about these terms?{" "}
              <Link href="/contact" className="text-[#00d4a3] font-semibold hover:underline">
                Contact our legal team →
              </Link>
            </p>
          </div>
        </div>
      </section>
 
      <Footer />
    </>
  );
}