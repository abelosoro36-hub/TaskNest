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
 
/* ╔══════════════════════════════════════════════════════════════════╗
   ║  BLOG POSTS DATA  ← ADD YOUR POSTS HERE                         ║
   ║ ──────────────────────────────────────────────────────────────── ║
   ║  Each post object needs:                                         ║
   ║   title     → headline of the post                              ║
   ║   slug      → URL-friendly ID  e.g. "how-to-earn-300-per-day"   ║
   ║   excerpt   → 1–2 sentence summary shown on the card            ║
   ║   author    → writer's name                                     ║
   ║   authorRole→ their title / team                                ║
   ║   date      → e.g. "May 12, 2026"                              ║
   ║   category  → tag shown on the card  e.g. "Earnings Tips"       ║
   ║   readTime  → e.g. "4 min read"                                 ║
   ║   featured  → true for the large hero card, false for grid      ║
   ║                                                                  ║
   ║  COVER IMAGE (optional):                                         ║
   ║   1. Save image to:  public/blog/your-slug.jpg  (800×450 px)    ║
   ║   2. Set  coverImage: "/blog/your-slug.jpg"                     ║
   ║      Leave as null to show the coloured placeholder gradient     ║
   ╚══════════════════════════════════════════════════════════════════╝ */
 
type Post = {
  title:      string;
  slug:       string;
  excerpt:    string;
  author:     string;
  authorRole: string;
  date:       string;
  category:   string;
  readTime:   string;
  featured:   boolean;
  coverImage: string | null;
  gradient:   string;            // fallback colour when no image
};
 
/* ─── ADD / EDIT YOUR BLOG POSTS IN THIS ARRAY ─────────────────── */
const POSTS: Post[] = [
  /* FEATURED POST — appears large at the top */
  {
    title:      "How I Earned $1,200 in My First Week on TaskNest",
    slug:       "earned-1200-first-week",
    excerpt:    "A Premium member shares her exact workflow, the tasks she chose, and the time management tricks that helped her hit four figures in seven days.",
    author:     "Amara K.",
    authorRole: "Premium Member",
    date:       "May 10, 2026",
    category:   "Success Stories",
    readTime:   "6 min read",
    featured:   true,
    /* ← REPLACE null WITH "/blog/earned-1200-first-week.jpg" once you have the image */
    coverImage: null,
    gradient:   "from-[#00d4a3] to-[#0b8c6f]",
  },
  /* GRID POSTS — appear in the 3-column grid below */
  {
    title:      "The 5 Best Task Types for Beginners in 2026",
    slug:       "best-tasks-for-beginners",
    excerpt:    "New to TaskNest? These five task categories offer the lowest barrier to entry and the fastest approval times.",
    author:     "Priya Nair",
    authorRole: "Head of Task Quality",
    date:       "May 5, 2026",
    category:   "Getting Started",
    readTime:   "4 min read",
    featured:   false,
    coverImage: null,
    gradient:   "from-[#3b82f6] to-[#1d4ed8]",
  },
  {
    title:      "AI Annotation Explained: What It Is and Why It Pays Well",
    slug:       "ai-annotation-explained",
    excerpt:    "AI annotation is one of the highest-paying task types on our platform. Here's what it involves and how to qualify.",
    author:     "Daniel Krause",
    authorRole: "Head of Engineering",
    date:       "April 28, 2026",
    category:   "Task Guides",
    readTime:   "5 min read",
    featured:   false,
    coverImage: null,
    gradient:   "from-[#8b5cf6] to-[#6d28d9]",
  },
  {
    title:      "Remote Work Trends: What Employers Want in 2026",
    slug:       "remote-work-trends-2026",
    excerpt:    "Data labelling, content review, and multilingual QA are exploding in demand. Here's why — and how to position yourself.",
    author:     "Marcus Ellis",
    authorRole: "Co-Founder & CEO",
    date:       "April 20, 2026",
    category:   "Industry Insights",
    readTime:   "7 min read",
    featured:   false,
    coverImage: null,
    gradient:   "from-[#f59e0b] to-[#b45309]",
  },
  {
    title:      "How TaskNest Ensures Every Task Pays a Fair Rate",
    slug:       "how-we-ensure-fair-pay",
    excerpt:    "Our Task Quality team reviews every new task before it goes live. Here's the exact criteria we use.",
    author:     "Priya Nair",
    authorRole: "Head of Task Quality",
    date:       "April 14, 2026",
    category:   "Behind the Scenes",
    readTime:   "3 min read",
    featured:   false,
    coverImage: null,
    gradient:   "from-[#ef4444] to-[#b91c1c]",
  },
  {
    title:      "10 Tips to Complete Tasks Faster and Earn More",
    slug:       "10-tips-complete-tasks-faster",
    excerpt:    "Speed without quality costs you approvals. Here are 10 tried-and-tested tips from our top earners.",
    author:     "Sarah Mbeki",
    authorRole: "Community Lead",
    date:       "April 7, 2026",
    category:   "Earnings Tips",
    readTime:   "5 min read",
    featured:   false,
    coverImage: null,
    gradient:   "from-[#ec4899] to-[#be185d]",
  },
];
/* ─────────────────────────────────────────────────────────────────── */
 
const CATEGORIES = ["All", ...Array.from(new Set(POSTS.map(p => p.category)))];
 
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const featured = POSTS.find(p => p.featured);
  const grid = POSTS.filter(p =>
    !p.featured && (activeCategory === "All" || p.category === activeCategory)
  );
 
  return (
    <>
      <Navbar />
 
      {/* Hero */}
      <section className="hero-bg grid-overlay pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-4">TaskNest Blog</span>
          <h1 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-4">
            Insights, Tips &<br /><span className="shimmer-text">Success Stories.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Guides, worker stories, and industry insights to help you earn more and work smarter.
          </p>
        </div>
      </section>
 
      <section className="bg-[#f1f5f9] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
          {/* ── Featured post ── */}
          {featured && (
            <div className="mb-12">
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm card-hover">
                  <div className="grid lg:grid-cols-2">
                    {/* Cover */}
                    <div className={`relative h-64 lg:h-auto bg-gradient-to-br ${featured.gradient} flex items-center justify-center`}>
                      {featured.coverImage ? (
                        <Image src={featured.coverImage} alt={featured.title} fill className="object-cover" />
                      ) : (
                        /* ── COVER IMAGE PLACEHOLDER ──
                           Replace by setting coverImage: "/blog/your-slug.jpg"
                           in the POSTS array above */
                        <div className="text-center px-8">
                          <div className="text-6xl mb-3">✍️</div>
                          <p className="text-white/60 text-sm">Add a cover image via coverImage field in POSTS array</p>
                        </div>
                      )}
                      <span className="absolute top-4 left-4 bg-white/15 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                        ⭐ Featured
                      </span>
                    </div>
                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-widest mb-3">{featured.category}</span>
                      <h2 className="text-2xl lg:text-3xl font-black text-[#0b1426] mb-3 leading-tight group-hover:text-[#00d4a3] transition-colors">{featured.title}</h2>
                      <p className="text-slate-500 leading-relaxed mb-6">{featured.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-[#0b1426] flex items-center justify-center text-[#00d4a3] font-black text-xs">
                            {featured.author.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-[#0b1426] font-semibold text-sm">{featured.author}</p>
                            <p className="text-slate-400 text-xs">{featured.date} · {featured.readTime}</p>
                          </div>
                        </div>
                        <span className="text-[#00d4a3] font-semibold text-sm group-hover:underline">Read →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
 
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === cat ? "bg-[#0b1426] text-white" : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"}`}
              >
                {cat}
              </button>
            ))}
          </div>
 
          {/* Grid posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {grid.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden card-hover">
                {/* Cover */}
                <div className={`relative h-44 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                  {post.coverImage ? (
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
                  ) : (
                    /* ── COVER IMAGE PLACEHOLDER ──
                       Set coverImage: "/blog/your-slug.jpg" in POSTS array */
                    <div className="text-center px-6">
                      <div className="text-4xl mb-1">📝</div>
                      <p className="text-white/50 text-xs">Add via coverImage in POSTS</p>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <span className="inline-block text-[#00d4a3] text-xs font-bold uppercase tracking-wide mb-2">{post.category}</span>
                  <h3 className="font-black text-[#0b1426] text-base mb-2 leading-tight group-hover:text-[#00d4a3] transition-colors">{post.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-[#0b1426] flex items-center justify-center text-[#00d4a3] font-black text-xs">
                        {post.author.split(" ").map(n => n[0]).join("")}
                      </div>
                      <p className="text-slate-500 text-xs">{post.author}</p>
                    </div>
                    <p className="text-slate-400 text-xs">{post.readTime}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
 
          {grid.length === 0 && (
            <div className="text-center py-16 text-slate-400">No posts in this category yet.</div>
          )}
        </div>
      </section>
 
      <Footer />
    </>
  );
}