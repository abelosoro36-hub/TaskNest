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
 
const SECTIONS = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us when you create an account, complete tasks, or contact support. This includes your name, email address, payment details, and task submission data. We also automatically collect certain information when you use our platform, such as your IP address, browser type, device information, and usage data through cookies and similar tracking technologies.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to: provide, maintain, and improve our platform; process task submissions and payments; send transactional emails and platform notifications; respond to your support requests; detect and prevent fraud and abuse; and comply with legal obligations. We do not sell your personal information to third parties for advertising purposes.`,
  },
  {
    title: "3. Sharing of Information",
    content: `We may share your information with: (a) Payment processors (Stripe, PayPal, Wise) to facilitate payouts; (b) Enterprise task providers — only the data needed to validate task completions; (c) Service providers who assist in platform operations, subject to strict confidentiality agreements; (d) Law enforcement or regulatory bodies when required by law. We require all third parties to maintain the security and confidentiality of your information.`,
  },
  {
    title: "4. Data Retention",
    content: `We retain your account information for as long as your account is active or as needed to provide services. If you close your account, we retain your data for up to 90 days before permanent deletion, except where retention is required by law (e.g. financial records, which are kept for 7 years in most jurisdictions).`,
  },
  {
    title: "5. Security",
    content: `We implement industry-standard security measures including TLS/SSL encryption in transit, AES-256 encryption at rest, two-factor authentication options, and regular third-party security audits. While we take every reasonable precaution, no internet transmission is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "6. Your Rights",
    content: `Depending on your location, you may have rights under applicable data protection laws including: the right to access, correct, or delete your personal data; the right to object to or restrict certain processing; the right to data portability; and the right to withdraw consent. To exercise any of these rights, contact us at privacy@tasknest.io. We will respond within 30 days.`,
  },
  {
    title: "7. Cookies",
    content: `We use essential cookies required for the platform to function, performance cookies to understand how users interact with our service, and preference cookies to remember your settings. You can control non-essential cookies through your browser settings. Disabling certain cookies may affect platform functionality.`,
  },
  {
    title: "8. Children's Privacy",
    content: `TaskNest is not directed at or intended for use by individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has created an account, please contact us immediately at privacy@tasknest.io and we will delete the account promptly.`,
  },
  {
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of material changes by email or through a prominent notice on our platform at least 14 days before the change takes effect. Your continued use of TaskNest after the effective date constitutes acceptance of the updated policy.`,
  },
  {
    title: "10. Contact Us",
    content: `For privacy-related questions or to exercise your rights, contact our Data Protection team at: privacy@tasknest.io. You may also write to us at: TaskNest, Attn: Privacy Team, [Company Address]. We aim to respond to all privacy enquiries within 30 days.`,
  },
];
 
export default function PrivacyPage() {
  return (
    <>
      <Navbar />
 
      <section className="hero-bg grid-overlay pt-32 pb-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-4">Legal</span>
          <h1 className="text-5xl font-black text-white mb-3">Privacy Policy</h1>
          <p className="text-slate-400">Last updated: <span className="text-slate-300 font-medium">May 1, 2026</span></p>
        </div>
      </section>
 
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
 
          {/* Intro */}
          <div className="bg-[#f8fafc] border border-[#00d4a3]/20 rounded-2xl p-6 mb-10">
            <p className="text-slate-600 leading-relaxed text-sm">
              TaskNest (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, share, and safeguard your information when you use the TaskNest platform. Please read it carefully before using our services.
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
 
          {/* Content sections */}
          <div className="space-y-8">
            {SECTIONS.map(({ title, content }) => (
              <div key={title} id={title.replace(/\s+/g, "-").toLowerCase()} className="scroll-mt-20">
                <h2 className="text-xl font-black text-[#0b1426] mb-3 pb-2 border-b border-slate-100">{title}</h2>
                <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
              </div>
            ))}
          </div>
 
          <div className="mt-12 p-5 bg-[#f1f5f9] rounded-2xl text-center">
            <p className="text-slate-500 text-sm">
              Questions about this policy?{" "}
              <Link href="/contact" className="text-[#00d4a3] font-semibold hover:underline">Contact our privacy team →</Link>
            </p>
          </div>
        </div>
      </section>
 
      <Footer />
    </>
  );
}