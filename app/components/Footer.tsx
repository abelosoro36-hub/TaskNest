import Link from "next/link";

const LINKS = {
  Platform: [
    { label: "How It Works",  href: "#how-it-works" },
    { label: "Task Catalog",  href: "#tasks" },
    { label: "Pricing",       href: "/pricing" },
    { label: "Dashboard",     href: "/dashboard" },
  ],
  Company: [
    { label: "About Us",      href: "#" },
    { label: "Blog",          href: "#" },
    { label: "Careers",       href: "#" },
    { label: "Contact",       href: "#" },
  ],
  Support: [
    { label: "FAQ",           href: "#faq" },
    { label: "Help Center",   href: "#" },
    { label: "Privacy Policy",href: "#" },
    { label: "Terms of Use",  href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#060d1a] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">

        {/* ── Top Grid ── */}
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
              The professional platform to earn real income from high-quality
              remote tasks — on your schedule, from anywhere.
            </p>
            {/* Social icons (placeholder SVGs) */}
            <div className="flex gap-3 mt-5">
              {["twitter", "linkedin", "instagram"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="h-9 w-9 rounded-lg bg-white/5 hover:bg-[#00d4a3]/20 border border-white/10 hover:border-[#00d4a3]/40 flex items-center justify-center transition-all duration-200"
                  aria-label={s}
                >
                  <span className="text-slate-400 text-xs capitalize">{s[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
                {group}
              </h4>
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

        {/* ── Bottom Bar ── */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} TaskNest. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#00d4a3] animate-pulse" />
            <span className="text-slate-400 text-sm">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}