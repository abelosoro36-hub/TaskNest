"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Tasks",        href: "#tasks" },
  { label: "Pricing",      href: "/pricing" },
  { label: "FAQ",          href: "#faq" },
];

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route navigation */
  const close = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b1426]/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" onClick={close} className="flex items-center gap-2 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">
            TN
          </span>
          <span className="text-white font-bold text-lg tracking-tight">
            Task<span className="text-[#00d4a3]">Nest</span>
          </span>
        </Link>

        {/* ── Desktop Nav Links ── */}
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

        {/* ── Desktop CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-sm font-medium text-slate-300 hover:text-white transition-colors px-4 py-2"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-sm font-semibold bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] px-5 py-2 rounded-lg transition-all duration-200 animate-pulse-ring"
          >
            Sign Up Free
          </Link>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-[5px] p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <span
            className={`block h-0.5 w-5 bg-white transition-all duration-300 origin-center ${
              menuOpen ? "rotate-45 translate-y-[7px]" : ""
            }`}
          />
          <span
            className={`block h-0.5 bg-white transition-all duration-300 ${
              menuOpen ? "w-0 opacity-0" : "w-5"
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-all duration-300 origin-center ${
              menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
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
                onClick={close}
                className="block text-slate-300 hover:text-[#00d4a3] font-medium py-3 px-3 rounded-lg hover:bg-white/5 transition-all"
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-3 border-t border-white/10 flex flex-col gap-2 mt-1">
            <Link
              href="/login"
              onClick={close}
              className="block text-center text-slate-300 hover:text-white font-medium py-2.5 px-3 rounded-lg border border-white/20 hover:border-white/40 transition-all"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={close}
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