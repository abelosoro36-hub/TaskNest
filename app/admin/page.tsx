"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

/* ── Types ── */
type Section =
  | "overview" | "projects" | "training" | "earnings"
  | "quality"  | "management" | "payments" | "notifications"
  | "analytics"| "security"  | "support"  | "review";

/* ── Sidebar nav items ── */
const NAV: { id: Section; label: string; icon: string; badge?: string }[] = [
  { id: "overview",      label: "Overview",                icon: "🏠"              },
  { id: "projects",      label: "Available Projects",      icon: "📋", badge: "6"  },
  { id: "training",      label: "Training & Quals",        icon: "🎓"              },
  { id: "earnings",      label: "Earnings Dashboard",      icon: "💰"              },
  { id: "quality",       label: "Quality & Accuracy",      icon: "🎯"              },
  { id: "management",    label: "Project Management",      icon: "🗂️"             },
  { id: "payments",      label: "Payments & Settings",     icon: "💳"              },
  { id: "notifications", label: "Notifications",           icon: "🔔", badge: "3"  },
  { id: "analytics",     label: "Community Analytics",     icon: "📊"              },
  { id: "security",      label: "Verification & Security", icon: "🔒"              },
  { id: "support",       label: "Support Center",          icon: "🛟"              },
  { id: "review",        label: "Task Review System",      icon: "✅", badge: "12" },
];

/* ═══════════════════════════════════════════
   SHARED UI ATOMS
═══════════════════════════════════════════ */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-slate-200 rounded-2xl ${className}`}>
      {children}
    </div>
  );
}

function StatCard({ label, value, sub, color = "text-[#00d4a3]", icon }: {
  label: string; value: string; sub: string; color?: string; icon: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">{label}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <p className={`text-3xl font-black mb-0.5 ${color}`}>{value}</p>
      <p className="text-slate-400 text-xs">{sub}</p>
    </Card>
  );
}

function SecHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-black text-[#0b1426]">{title}</h2>
      <p className="text-slate-400 text-sm mt-0.5">{sub}</p>
    </div>
  );
}

type BadgeColor = "green"|"yellow"|"red"|"blue"|"purple"|"gray";
function Badge({ text, color }: { text: string; color: BadgeColor }) {
  const map: Record<BadgeColor, string> = {
    green:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    yellow: "bg-amber-50   text-amber-700   border-amber-200",
    red:    "bg-red-50     text-red-700     border-red-200",
    blue:   "bg-blue-50    text-blue-700    border-blue-200",
    purple: "bg-purple-50  text-purple-700  border-purple-200",
    gray:   "bg-slate-100  text-slate-500   border-slate-200",
  };
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${map[color]}`}>
      {text}
    </span>
  );
}

function Bar({ value, color = "#00d4a3" }: { value: number; color?: string }) {
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${Math.min(value, 100)}%`, background: color }} />
    </div>
  );
}

function THead({ cols }: { cols: string[] }) {
  return (
    <thead className="bg-[#0b1426]">
      <tr>
        {cols.map(c => (
          <th key={c} className="text-left py-3 px-4 text-slate-400 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">{c}</th>
        ))}
      </tr>
    </thead>
  );
}

/* ═══════════════════════════════════════════
   SECTION COMPONENTS
═══════════════════════════════════════════ */

/* ── 1. Overview ── */
function Overview() {
  const [stats, setStats]   = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(r => r.json())
      .then(d => { if (d.success) setStats(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activity = [
    { user: "Amara K.",  action: "Completed AI Annotation task",     pay: "+$85.00",  time: "2m ago",  av: "AK", c: "#00d4a3" },
    { user: "Diego R.",  action: "Submitted Medical Image review",   pay: "+$120.00", time: "14m ago", av: "DR", c: "#3b82f6" },
    { user: "Priya M.",  action: "Passed Intermediate qualification", pay: "—",        time: "32m ago", av: "PM", c: "#8b5cf6" },
    { user: "Leo F.",    action: "Withdrew $340 via PayPal",          pay: "-$340.00", time: "1h ago",  av: "LF", c: "#f59e0b" },
    { user: "Sarah N.",  action: "Raised support ticket #2041",       pay: "—",        time: "2h ago",  av: "SN", c: "#ef4444" },
  ];
  const health = [
    { label: "Task Completion Rate", v: 91, color: "#00d4a3" },
    { label: "Worker Satisfaction",  v: 87, color: "#3b82f6" },
    { label: "On-Time Payout Rate",  v: 98, color: "#f59e0b" },
    { label: "Quality Pass Rate",    v: 94, color: "#8b5cf6" },
    { label: "Support Resolution",   v: 83, color: "#ef4444" },
  ];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="h-8 w-8 border-4 border-[#00d4a3] border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <SecHead title="Admin Overview" sub="Platform health at a glance — real data from MongoDB." />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Workers"    value={stats.totalWorkers?.toLocaleString() ?? "—"}    sub="+124 this week"      icon="👥" color="text-[#0b1426]" />
        <StatCard label="Active Tasks"     value={String(stats.activeTasks ?? "—")}               sub="Currently live"      icon="📋" color="text-[#00d4a3]" />
        <StatCard label="Today's Payouts"  value={`$${(stats.todayPayouts ?? 0).toLocaleString()}`} sub="Processed today"  icon="💸" color="text-[#f59e0b]" />
        <StatCard label="Monthly Revenue"  value={`$${(stats.monthRevenue ?? 0).toLocaleString()}`} sub="This month"       icon="📈" color="text-[#3b82f6]" />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Open Tickets"          value={String(stats.openTickets          ?? "—")} sub="Needs attention"   icon="🛟" color="text-red-500"    />
        <StatCard label="Pending Verifications" value={String(stats.pendingVerifications ?? "—")} sub="Awaiting review"   icon="🔒" color="text-purple-500" />
        <StatCard label="Tasks Under Review"    value={String(stats.tasksUnderReview     ?? "—")} sub="Flagged for QA"    icon="✅" color="text-[#0b1426]"  />
        <StatCard label="Platform Avg Accuracy" value="94.2%"                                     sub="+1.3% this week"   icon="🎯" color="text-[#00d4a3]"  />
      </div>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Platform Health</h3>
        <div className="space-y-4">
          {health.map(({ label, v, color }) => (
            <div key={label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-slate-600 font-medium">{label}</span>
                <span className="text-sm font-bold text-[#0b1426]">{v}%</span>
              </div>
              <Bar value={v} color={color} />
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Recent Activity</h3>
        <div className="space-y-4">
          {activity.map(({ user, action, pay, time, av, c }) => (
            <div key={user + time} className="flex items-center gap-4">
              <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0" style={{ background: c }}>{av}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[#0b1426] font-semibold text-sm">{user}</p>
                <p className="text-slate-400 text-xs truncate">{action}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-bold ${pay.startsWith("+") ? "text-[#00d4a3]" : pay.startsWith("-") ? "text-red-500" : "text-slate-400"}`}>{pay}</p>
                <p className="text-slate-400 text-xs">{time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ── 2. Projects ── */
function Projects() {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks]   = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const qs = filter !== "All" ? `?status=${filter.toLowerCase()}` : "";
    fetch(`/api/tasks${qs}`)
      .then(r => r.json())
      .then(d => { if (d.success) setTasks(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [filter]);

  /* Fallback static data while DB is empty */
  const staticProjects = [
    { _id: "1", title: "E-commerce Product Categorisation", client: "ShopGlobal Inc.",  category: "Data Review",    plan: "basic",   payMin: 8,  payMax: 15,  totalSlots: 12, filledSlots: 8,  deadline: "2026-05-23", status: "active",  difficulty: "Beginner"     },
    { _id: "2", title: "Conversational AI Annotation",      client: "DeepMind Labs",    category: "AI Training",    plan: "basic",   payMin: 18, payMax: 35,  totalSlots: 6,  filledSlots: 4,  deadline: "2026-05-25", status: "active",  difficulty: "Intermediate" },
    { _id: "3", title: "Medical Image Classification",      client: "HealthAI Corp",    category: "Image Labeling", plan: "premium", payMin: 40, payMax: 80,  totalSlots: 4,  filledSlots: 1,  deadline: "2026-05-28", status: "active",  difficulty: "Advanced"     },
    { _id: "4", title: "Multilingual Content Review",       client: "TranslatePro",     category: "Content QA",     plan: "premium", payMin: 25, payMax: 50,  totalSlots: 8,  filledSlots: 3,  deadline: "2026-05-30", status: "active",  difficulty: "Intermediate" },
    { _id: "5", title: "Autonomous Driving Scene Tagging",  client: "AutoVision AI",    category: "Video Labeling", plan: "premium", payMin: 60, payMax: 120, totalSlots: 3,  filledSlots: 0,  deadline: "2026-06-02", status: "active",  difficulty: "Advanced"     },
    { _id: "6", title: "Brand Perception Survey",           client: "Insights Co.",     category: "Survey",         plan: "basic",   payMin: 5,  payMax: 10,  totalSlots: 20, filledSlots: 15, deadline: "2026-05-22", status: "closing", difficulty: "Beginner"     },
  ];

  const display = tasks.length > 0 ? tasks : staticProjects;
  const statuses = ["All", "active", "closing", "draft", "paused"];

  return (
    <div className="space-y-6">
      <SecHead title="Available Projects" sub="Manage all active, draft, and closing task projects." />
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Active"  value="6" sub="Taking submissions" icon="🟢" color="text-[#00d4a3]" />
        <StatCard label="Closing" value="1" sub="Slots nearly full"  icon="🟡" color="text-[#f59e0b]" />
        <StatCard label="Draft"   value="1" sub="Awaiting approval"  icon="⚪" color="text-slate-400"  />
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${filter === s ? "bg-[#0b1426] text-white" : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300"}`}>
            {s}
          </button>
        ))}
        <button className="ml-auto px-4 py-2 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold rounded-full text-sm transition-all">
          + New Project
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><div className="h-8 w-8 border-4 border-[#00d4a3] border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <THead cols={["Project", "Client", "Plan", "Pay Range", "Slots", "Deadline", "Status", "Actions"]} />
              <tbody>
                {(display as typeof staticProjects).map((p, i) => (
                  <tr key={p._id} className={`border-t border-slate-100 hover:bg-[#00d4a3]/5 transition-colors ${i % 2 !== 0 ? "bg-slate-50/50" : ""}`}>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-[#0b1426] text-sm">{String(p.title)}</p>
                      <p className="text-slate-400 text-xs">{String(p.category)} · {String(p.difficulty)}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs whitespace-nowrap">{String(p.client)}</td>
                    <td className="py-3 px-4"><Badge text={String(p.plan)} color={p.plan === "premium" ? "yellow" : "blue"} /></td>
                    <td className="py-3 px-4 font-bold text-[#0b1426] whitespace-nowrap">${String(p.payMin)}–${String(p.payMax)}</td>
                    <td className="py-3 px-4 min-w-[90px]">
                      <div className="text-xs text-slate-500 mb-1">{String(p.filledSlots)}/{String(p.totalSlots)}</div>
                      <Bar value={Math.round((Number(p.filledSlots) / Number(p.totalSlots)) * 100)} />
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-xs whitespace-nowrap">{String(p.deadline).slice(0, 10)}</td>
                    <td className="py-3 px-4">
                      <Badge text={String(p.status)} color={p.status === "active" ? "green" : p.status === "closing" ? "yellow" : "gray"} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button className="text-xs text-[#00d4a3] hover:underline font-semibold">Edit</button>
                        <button className="text-xs text-red-400 hover:underline font-semibold">Pause</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

/* ── 3. Training ── */
function Training() {
  const [open, setOpen] = useState<number | null>(null);
  const modules = [
    { id: 1, title: "Platform Orientation",         level: "Beginner",     dur: "20 min", enrolled: 4821, passed: 4512, required: true,  done: true  },
    { id: 2, title: "Data Labeling Fundamentals",   level: "Beginner",     dur: "35 min", enrolled: 3940, passed: 3601, required: true,  done: true  },
    { id: 3, title: "AI Annotation Best Practices", level: "Intermediate", dur: "50 min", enrolled: 2140, passed: 1820, required: false, done: true  },
    { id: 4, title: "Image & Video Labeling",        level: "Intermediate", dur: "45 min", enrolled: 1880, passed: 1540, required: false, done: false },
    { id: 5, title: "Medical Data Handling",         level: "Advanced",     dur: "60 min", enrolled: 640,  passed: 490,  required: false, done: false },
    { id: 6, title: "Legal & Compliance Review",     level: "Advanced",     dur: "55 min", enrolled: 310,  passed: 228,  required: false, done: false },
  ];
  const levelColor = (l: string): BadgeColor => l === "Beginner" ? "green" : l === "Intermediate" ? "blue" : "purple";

  return (
    <div className="space-y-6">
      <SecHead title="Training & Qualification Center" sub="Complete modules to unlock higher-paying task categories." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Modules"       value="6"     sub="2 advanced locked"  icon="📚" color="text-[#0b1426]" />
        <StatCard label="My Progress"   value="3/6"   sub="3 remaining"        icon="🎓" color="text-[#00d4a3]" />
        <StatCard label="Avg Score"     value="92.7%" sub="Above platform avg" icon="🏆" color="text-[#f59e0b]" />
        <StatCard label="Current Level" value="Inter" sub="Intermediate"       icon="⭐" color="text-[#3b82f6]" />
      </div>
      <div className="space-y-3">
        {modules.map(m => (
          <Card key={m.id} className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 font-black text-sm ${m.done ? "bg-[#00d4a3]/15 text-[#00d4a3]" : "bg-slate-100 text-slate-400"}`}>
                  {m.done ? "✓" : m.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-[#0b1426] text-sm">{m.title}</span>
                    {m.required && <Badge text="Required" color="red" />}
                    <Badge text={m.level} color={levelColor(m.level)} />
                  </div>
                  <p className="text-slate-400 text-xs">{m.dur} · {m.enrolled.toLocaleString()} enrolled · {Math.round((m.passed / m.enrolled) * 100)}% pass rate</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(open === m.id ? null : m.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${m.done ? "bg-slate-100 text-slate-500" : "bg-[#0b1426] hover:bg-[#152236] text-white"}`}
              >
                {m.done ? "Review" : "Start"}
              </button>
            </div>
            {open === m.id && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-slate-500 text-sm mb-4">Pass with 70%+ to unlock this task category. Questions are multiple choice.</p>
                <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                  {[["Enrolled", m.enrolled.toLocaleString()], ["Pass Rate", `${Math.round((m.passed / m.enrolled) * 100)}%`], ["Avg Score", "85%"]].map(([l, v]) => (
                    <div key={l} className="bg-[#f8fafc] rounded-xl p-3">
                      <p className="font-black text-[#0b1426] text-lg">{v}</p>
                      <p className="text-slate-400 text-xs">{l}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold py-2.5 rounded-xl text-sm transition-all">
                  {m.done ? "Retake Module" : "Begin Module →"}
                </button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ── 4. Earnings ── */
function Earnings() {
  const [payments, setPayments] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetch("/api/payments?limit=8")
      .then(r => r.json())
      .then(d => { if (d.success) setPayments(d.data); })
      .catch(() => {});
  }, []);

  const staticHistory = [
    { date: "May 19", task: "AI Annotation — Batch #14",    amount: 85,  status: "Paid",    method: "PayPal" },
    { date: "May 18", task: "Medical Image Review #008",    amount: 120, status: "Paid",    method: "Wise"   },
    { date: "May 18", task: "Content QA — FR/EN Set B",     amount: 47,  status: "Paid",    method: "PayPal" },
    { date: "May 17", task: "Brand Survey Batch #22",       amount: 28,  status: "Paid",    method: "Bank"   },
    { date: "May 16", task: "Driving Scene Tagging",        amount: 115, status: "Pending", method: "Wise"   },
    { date: "May 14", task: "AI Annotation — Batch #12",    amount: 92,  status: "Paid",    method: "PayPal" },
  ];

  const weekly = [
    { day: "Mon", v: 120 }, { day: "Tue", v: 85  }, { day: "Wed", v: 210 },
    { day: "Thu", v: 95  }, { day: "Fri", v: 175 }, { day: "Sat", v: 310 },
    { day: "Sun", v: 145 },
  ];
  const max = Math.max(...weekly.map(w => w.v));

  return (
    <div className="space-y-6">
      <SecHead title="Earnings Dashboard" sub="Track your income, payouts, and payment history." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today"       value="$342.50" sub="+12% from yesterday"  icon="💰" color="text-[#00d4a3]" />
        <StatCard label="This Week"   value="$1,140"  sub="7 tasks completed"    icon="📅" color="text-[#0b1426]" />
        <StatCard label="This Month"  value="$4,280"  sub="Best month yet 🎉"    icon="📆" color="text-[#f59e0b]" />
        <StatCard label="Pending"     value="$115.00" sub="Processing in 18 hrs" icon="⏳" color="text-[#3b82f6]" />
      </div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-[#0b1426]">This Week&apos;s Earnings</h3>
          <span className="text-[#00d4a3] font-bold text-sm">$1,140 total</span>
        </div>
        <div className="flex items-end gap-3 h-40">
          {weekly.map(({ day, v }) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-2">
              <p className="text-xs font-bold text-[#0b1426]">${v}</p>
              <div className="w-full rounded-t-lg" style={{ height: `${(v / max) * 120}px`, background: day === "Sat" ? "#00d4a3" : "#0b1426" }} />
              <p className="text-xs text-slate-400">{day}</p>
            </div>
          ))}
        </div>
      </Card>
      <div className="bg-gradient-to-r from-[#0b1426] to-[#152236] border border-[#00d4a3]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white font-black text-xl">Available Balance: <span className="text-[#00d4a3]">$227.50</span></p>
          <p className="text-slate-400 text-sm">Minimum payout $10. Premium: 24-hr processing.</p>
        </div>
        <button className="shrink-0 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold px-6 py-3 rounded-xl text-sm transition-all">
          Request Payout →
        </button>
      </div>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">Payment History</h3>
          <button className="text-xs text-[#00d4a3] font-semibold hover:underline">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <THead cols={["Date", "Task", "Amount", "Method", "Status"]} />
            <tbody>
              {staticHistory.map((h, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-slate-400 text-xs">{h.date}</td>
                  <td className="py-3 px-4 text-[#0b1426] font-medium">{h.task}</td>
                  <td className="py-3 px-4 font-black text-[#0b1426]">${h.amount}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{h.method}</td>
                  <td className="py-3 px-4"><Badge text={h.status} color={h.status === "Paid" ? "green" : "yellow"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ── 5. Quality ── */
function Quality() {
  const workers = [
    { name: "Amara K.",  tasks: 142, acc: 98, speed: "22 min", streak: 14, tier: "Elite"    },
    { name: "Priya M.",  tasks: 118, acc: 96, speed: "28 min", streak: 9,  tier: "Elite"    },
    { name: "Diego R.",  tasks: 93,  acc: 91, speed: "35 min", streak: 5,  tier: "Pro"      },
    { name: "James O.",  tasks: 74,  acc: 88, speed: "41 min", streak: 3,  tier: "Pro"      },
    { name: "Lena S.",   tasks: 61,  acc: 84, speed: "44 min", streak: 1,  tier: "Standard" },
    { name: "Carlos V.", tasks: 32,  acc: 72, speed: "58 min", streak: 0,  tier: "Watch"    },
  ];
  const tColor = (t: string): BadgeColor => t === "Elite" ? "green" : t === "Pro" ? "blue" : t === "Standard" ? "yellow" : "red";

  return (
    <div className="space-y-6">
      <SecHead title="Quality & Accuracy Monitoring" sub="Track worker performance and maintain quality standards." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Platform Accuracy" value="94.2%" sub="+1.3% this week"     icon="🎯" color="text-[#00d4a3]" />
        <StatCard label="Elite Workers"     value="284"   sub="Top 2.3% performers" icon="🏆" color="text-[#f59e0b]" />
        <StatCard label="On Watch List"     value="38"    sub="Accuracy below 75%"  icon="⚠️" color="text-red-500"   />
        <StatCard label="Avg Task Speed"    value="34 min" sub="-3 min from last wk" icon="⚡" color="text-[#3b82f6]" />
      </div>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Accuracy by Category</h3>
        <div className="space-y-4">
          {[
            { cat: "AI Annotation",   s: 96, c: "#00d4a3" },
            { cat: "Data Review",     s: 93, c: "#3b82f6" },
            { cat: "Content QA",      s: 91, c: "#8b5cf6" },
            { cat: "Image Labeling",  s: 88, c: "#f59e0b" },
            { cat: "Video Labeling",  s: 85, c: "#ef4444" },
            { cat: "Document Review", s: 79, c: "#ec4899" },
          ].map(({ cat, s, c }) => (
            <div key={cat}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-slate-600 font-medium">{cat}</span>
                <span className="text-sm font-black text-[#0b1426]">{s}%</span>
              </div>
              <Bar value={s} color={c} />
            </div>
          ))}
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-black text-[#0b1426]">Leaderboard</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <THead cols={["Rank", "Worker", "Tasks", "Accuracy", "Avg Speed", "Streak", "Tier"]} />
            <tbody>
              {workers.map((w, i) => (
                <tr key={w.name} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-black">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</td>
                  <td className="py-3 px-4 font-semibold text-[#0b1426]">{w.name}</td>
                  <td className="py-3 px-4 text-slate-600">{w.tasks}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0b1426]">{w.acc}%</span>
                      <div className="w-16"><Bar value={w.acc} color={w.acc >= 90 ? "#00d4a3" : w.acc >= 80 ? "#f59e0b" : "#ef4444"} /></div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{w.speed}</td>
                  <td className="py-3 px-4 text-xs">{w.streak > 0 ? `🔥 ${w.streak}d` : "—"}</td>
                  <td className="py-3 px-4"><Badge text={w.tier} color={tColor(w.tier)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ── 6. Management ── */
function Management() {
  const pipeline = [
    { stage: "Submitted", count: 4,  color: "#3b82f6" },
    { stage: "In Review", count: 7,  color: "#f59e0b" },
    { stage: "Approved",  count: 6,  color: "#00d4a3" },
    { stage: "Live",      count: 6,  color: "#0b1426" },
    { stage: "Closing",   count: 1,  color: "#8b5cf6" },
    { stage: "Completed", count: 34, color: "#64748b" },
  ];
  const queue = [
    { id: "T-2041", worker: "Amara K.",  project: "AI Annotation",   time: "9:14am", status: "Under Review", flag: false },
    { id: "T-2042", worker: "Diego R.",  project: "Medical Imaging", time: "9:02am", status: "Approved",     flag: false },
    { id: "T-2043", worker: "Priya M.",  project: "Content QA",      time: "8:45am", status: "Flagged",      flag: true  },
    { id: "T-2044", worker: "Leo F.",    project: "Brand Survey",     time: "Yesterday", status: "Approved",  flag: false },
    { id: "T-2045", worker: "Carlos V.", project: "Data Review",      time: "Yesterday", status: "Rejected",  flag: true  },
  ];

  return (
    <div className="space-y-6">
      <SecHead title="Project Management Panel" sub="Full lifecycle control over tasks and worker submissions." />
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Project Pipeline</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {pipeline.map(({ stage, count, color }) => (
            <div key={stage} className="text-center p-4 bg-[#f8fafc] rounded-2xl border border-slate-100">
              <p className="text-3xl font-black mb-1" style={{ color }}>{count}</p>
              <p className="text-slate-400 text-xs">{stage}</p>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid sm:grid-cols-3 gap-4">
        <button className="flex items-center justify-center gap-2 bg-[#00d4a3] text-[#0b1426] font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-all">➕ Create New Project</button>
        <button className="flex items-center justify-center gap-2 bg-[#0b1426] text-white font-bold py-3 rounded-xl text-sm hover:bg-[#152236] transition-all">✅ Bulk Approve Tasks</button>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-[#0b1426] font-bold py-3 rounded-xl text-sm hover:border-slate-300 transition-all">📥 Export Report</button>
      </div>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-black text-[#0b1426]">Submission Queue</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <THead cols={["Task ID", "Worker", "Project", "Submitted", "Status", "Actions"]} />
            <tbody>
              {queue.map(t => (
                <tr key={t.id} className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${t.flag ? "bg-red-50/30" : ""}`}>
                  <td className="py-3 px-4 text-slate-400 text-xs font-mono">{t.id}</td>
                  <td className="py-3 px-4 font-semibold text-[#0b1426] text-sm">{t.worker}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{t.project}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs">{t.time}</td>
                  <td className="py-3 px-4">
                    <Badge text={t.status} color={t.status === "Approved" ? "green" : t.status === "Flagged" || t.status === "Rejected" ? "red" : "yellow"} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-xs text-[#00d4a3] hover:underline font-semibold">Review</button>
                      {t.flag && <button className="text-xs text-red-400 hover:underline font-semibold">Escalate</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ── 7. Payments (fixed — no useState in map) ── */
const NOTIF_LABELS = [
  "New task available",
  "Task approved / rejected",
  "Payout processed",
  "Weekly earnings summary",
  "Platform announcements",
  "New training modules",
];
const NOTIF_DEFAULTS = [true, true, true, false, true, false];

function Payments() {
  const [saved,   setSaved]   = useState(false);
  const [toggles, setToggles] = useState(NOTIF_DEFAULTS);

  const flip = useCallback((i: number) =>
    setToggles(p => p.map((v, idx) => idx === i ? !v : v)), []);

  return (
    <div className="space-y-6">
      <SecHead title="Payments & Settings" sub="Manage your payout method, plan, and account preferences." />
      <div className="grid sm:grid-cols-2 gap-5">
        <Card className="p-6">
          <h3 className="font-black text-[#0b1426] mb-4">Payout Methods</h3>
          <div className="space-y-3">
            {[
              { method: "PayPal",        account: "jane@example.com", primary: true  },
              { method: "Wise",          account: "+254 712 345 678", primary: false },
              { method: "Bank Transfer", account: "KE ···· 4421",     primary: false },
            ].map(({ method, account, primary }) => (
              <div key={method} className={`flex items-center justify-between p-3 rounded-xl border ${primary ? "border-[#00d4a3]/40 bg-[#00d4a3]/5" : "border-slate-100"}`}>
                <div>
                  <p className="text-[#0b1426] font-semibold text-sm">{method}</p>
                  <p className="text-slate-400 text-xs">{account}</p>
                </div>
                {primary
                  ? <Badge text="Primary" color="green" />
                  : <button className="text-xs text-[#00d4a3] font-semibold hover:underline">Set Primary</button>}
              </div>
            ))}
            <button className="w-full border border-dashed border-slate-300 hover:border-[#00d4a3] text-slate-400 hover:text-[#00d4a3] font-semibold py-2.5 rounded-xl text-sm transition-all">
              + Add Payment Method
            </button>
          </div>
        </Card>
        <div className="bg-gradient-to-b from-[#0b1426] to-[#152236] border border-[#f59e0b]/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-white">Current Plan</h3>
            <Badge text="Premium" color="yellow" />
          </div>
          <p className="text-4xl font-black text-white mb-1">$100<span className="text-slate-400 text-base font-normal">/mo</span></p>
          <p className="text-slate-400 text-sm mb-4">Renews June 1, 2026</p>
          <div className="space-y-2 mb-5">
            {["All task categories", "Earn $300+/day", "24-hr payouts", "Priority support"].map(f => (
              <div key={f} className="flex items-center gap-2 text-slate-300 text-sm">
                <svg className="h-4 w-4 text-[#f59e0b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                {f}
              </div>
            ))}
          </div>
          <button className="w-full border border-white/20 hover:border-white/40 text-white font-semibold py-2.5 rounded-xl text-sm transition-all">Manage Subscription</button>
        </div>
      </div>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Account Preferences</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[["Full Name","Jane Doe","text"],["Email","jane@example.com","email"],["Country","Kenya","text"],["Language","English","text"]].map(([l, v, t]) => (
            <div key={l}>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{l}</label>
              <input type={t} defaultValue={v} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#0b1426] focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all" />
            </div>
          ))}
        </div>
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className="mt-5 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold px-6 py-2.5 rounded-xl text-sm transition-all">
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </Card>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Notification Preferences</h3>
        <div className="space-y-4">
          {NOTIF_LABELS.map((label, i) => (
            <div key={label} className="flex items-center justify-between py-1">
              <span className="text-[#0b1426] font-medium text-sm">{label}</span>
              <button onClick={() => flip(i)} className={`relative h-6 w-11 rounded-full transition-all duration-200 ${toggles[i] ? "bg-[#00d4a3]" : "bg-slate-200"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${toggles[i] ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ── 8. Notifications ── */
function Notifications() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const [dbNotifs, setDbNotifs]   = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetch("/api/notifications")
      .then(r => r.json())
      .then(d => { if (d.success && d.data.length) setDbNotifs(d.data); })
      .catch(() => {});
  }, []);

  const announcements = dbNotifs.length > 0 ? dbNotifs : [
    { id: 1, type: "New",    title: "New Premium Tasks Available",   body: "5 new advanced tasks have been added. Premium members get first access for 12 hours.", time: "10 min ago", pinned: true  },
    { id: 2, type: "Update", title: "Payout Processing — May 19",   body: "All pending payouts from May 17–18 have been processed successfully.",                   time: "2 hrs ago",  pinned: false },
    { id: 3, type: "Alert",  title: "Maintenance Window — May 22",  body: "Platform offline for scheduled maintenance 02:00–04:00 UTC. Save your work.",            time: "1 day ago",  pinned: false },
  ];
  const inbox = [
    { from: "Quality Team", subject: "Your task T-2038 was approved",      time: "5 min ago",  read: false },
    { from: "Support",      subject: "Ticket #2039 has been resolved",      time: "1 hr ago",   read: false },
    { from: "Finance",      subject: "Payout of $227.50 sent via PayPal",   time: "3 hrs ago",  read: false },
    { from: "Platform",     subject: "New AI Annotation Batch is live",     time: "6 hrs ago",  read: true  },
    { from: "Quality Team", subject: "Task T-2031 feedback — please review",time: "1 day ago",  read: true  },
    { from: "Platform",     subject: "Weekly summary: you earned $1,140",   time: "2 days ago", read: true  },
  ];

  return (
    <div className="space-y-6">
      <SecHead title="Notifications & Announcements" sub="Platform updates, task alerts, and your message inbox." />
      <div className="space-y-3">
        {(announcements as typeof announcements).filter(a => !dismissed.includes(Number(a.id))).map(a => (
          <div key={String(a.id)} className={`bg-white border rounded-2xl p-5 relative ${a.pinned ? "border-[#00d4a3]/40" : "border-slate-200"}`}>
            {a.pinned && <span className="absolute top-3 right-12 text-[#00d4a3] text-xs font-bold">📌 Pinned</span>}
            <button onClick={() => setDismissed(p => [...p, Number(a.id)])} className="absolute top-3 right-4 text-slate-300 hover:text-slate-500 text-xl leading-none">×</button>
            <div className="flex items-start gap-3 pr-8">
              <span className="text-lg">{a.type === "Alert" ? "⚠️" : a.type === "New" ? "🆕" : "📢"}</span>
              <div>
                <p className="font-bold text-[#0b1426] mb-1">{String(a.title)}</p>
                <p className="text-slate-500 text-sm">{String(a.body)}</p>
                <p className="text-slate-400 text-xs mt-2">{String(a.time ?? "")}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">Message Inbox</h3>
          <span className="bg-[#00d4a3] text-[#0b1426] text-xs font-black px-2.5 py-1 rounded-full">3 unread</span>
        </div>
        <div className="divide-y divide-slate-100">
          {inbox.map(({ from, subject, time, read }, i) => (
            <div key={i} className={`flex items-start gap-4 px-6 py-4 hover:bg-slate-50 cursor-pointer transition-colors ${!read ? "bg-[#00d4a3]/5" : ""}`}>
              <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${!read ? "bg-[#00d4a3]" : "bg-transparent"}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!read ? "font-bold text-[#0b1426]" : "font-medium text-slate-600"}`}>{from}</p>
                <p className="text-slate-500 text-sm truncate">{subject}</p>
              </div>
              <p className="text-slate-400 text-xs shrink-0 whitespace-nowrap">{time}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ── 9. Analytics ── */
function Analytics() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then(r => r.json())
      .then(d => { if (d.success) setData(d.data); })
      .catch(() => {});
  }, []);

  const monthly = [
    { month: "Dec", rev: 61 }, { month: "Jan", rev: 67 }, { month: "Feb", rev: 72 },
    { month: "Mar", rev: 78 }, { month: "Apr", rev: 84 }, { month: "May", rev: 92 },
  ];

  return (
    <div className="space-y-6">
      <SecHead title="Community & Performance Analytics" sub="Platform-wide trends, worker growth, and task performance." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Workers"    value={(data?.totalWorkers as number)?.toLocaleString() ?? "12,418"} sub="+124 this week"   icon="👥" color="text-[#0b1426]" />
        <StatCard label="New Signups (7d)" value={String(data?.newSignups ?? 892)}                              sub="+34% vs last wk" icon="📈" color="text-[#00d4a3]" />
        <StatCard label="Tasks (Month)"    value={String(data?.tasksCompletedMonth ?? "4,821")}                 sub="Completed"       icon="✅" color="text-[#f59e0b]" />
        <StatCard label="Total Paid Out"   value={`$${((data?.totalPaidOut as number) ?? 3200000).toLocaleString()}`} sub="All time"   icon="💸" color="text-[#3b82f6]" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Card className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Plan Distribution</h3>
          <div className="space-y-4">
            {[{ plan: "Free", count: 7210, pct: 58, c: "#64748b" }, { plan: "Basic", count: 3820, pct: 31, c: "#00d4a3" }, { plan: "Premium", count: 1388, pct: 11, c: "#f59e0b" }].map(({ plan, count, pct, c }) => (
              <div key={plan}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-semibold text-slate-600">{plan} — {count.toLocaleString()}</span>
                  <span className="text-sm font-black text-[#0b1426]">{pct}%</span>
                </div>
                <Bar value={pct} color={c} />
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Top Countries</h3>
          <div className="space-y-3">
            {[["🇰🇪 Kenya",2840,23],["🇵🇭 Philippines",2140,17],["🇮🇳 India",1920,15],["🇳🇬 Nigeria",1480,12],["🇧🇷 Brazil",980,8]].map(([c, w, p]) => (
              <div key={String(c)} className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600 w-36">{c}</span>
                <div className="flex-1"><Bar value={Number(p)} color="#0b1426" /></div>
                <span className="text-sm font-bold text-[#0b1426] w-12 text-right">{Number(w).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Monthly Revenue</h3>
        <div className="flex items-end gap-3 h-36">
          {monthly.map(({ month, rev }) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
              <p className="text-xs font-bold text-[#0b1426]">${rev}k</p>
              <div className="w-full rounded-t-lg" style={{ height: `${(rev / 92) * 120}px`, background: month === "May" ? "#00d4a3" : "#0b1426" }} />
              <p className="text-xs text-slate-400">{month}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ── 10. Security ── */
function Security() {
  const [twoFA, setTwoFA] = useState(true);
  const [workers, setWorkers] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetch("/api/workers?verified=false&limit=5")
      .then(r => r.json())
      .then(d => { if (d.success) setWorkers(d.data); })
      .catch(() => {});
  }, []);

  const pending = workers.length > 0 ? workers : [
    { _id: "1", firstName: "Michael", lastName: "Torres", email: "m.torres@email.com", country: "Colombia", verificationStatus: "pending" },
    { _id: "2", firstName: "Fatima",  lastName: "Al-Amin", email: "fatima.a@email.com", country: "Egypt",   verificationStatus: "pending" },
    { _id: "3", firstName: "Yuki",    lastName: "Tanaka",  email: "yuki.t@email.com",   country: "Japan",   verificationStatus: "pending" },
    { _id: "4", firstName: "Grace",   lastName: "Ochieng", email: "grace.o@email.com",  country: "Uganda",  verificationStatus: "pending" },
  ];

  return (
    <div className="space-y-6">
      <SecHead title="Account Verification & Security" sub="Manage identity verification, 2FA, and account security." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Verified"        value="11,840" sub="95.3% of total"  icon="✅" color="text-[#00d4a3]"  />
        <StatCard label="Pending"         value="27"     sub="Avg wait 6 hrs"  icon="⏳" color="text-[#f59e0b]"  />
        <StatCard label="Rejected (30d)"  value="14"     sub="Fraudulent docs" icon="❌" color="text-red-500"    />
        <StatCard label="2FA Enabled"     value="78%"    sub="Of all accounts" icon="🔐" color="text-[#3b82f6]"  />
      </div>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-4">Account Security</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-xl border border-slate-100">
            <div>
              <p className="font-semibold text-[#0b1426] text-sm">Two-Factor Authentication (2FA)</p>
              <p className="text-slate-400 text-xs">Protect with an authenticator app</p>
            </div>
            <button onClick={() => setTwoFA(v => !v)} className={`relative h-6 w-11 rounded-full transition-all duration-200 ${twoFA ? "bg-[#00d4a3]" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${twoFA ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
          {[["📧","Email Verified"],["🪪","Identity Document"],["💳","Payment Method"],["🔑","Password: Strong"]].map(([icon, label]) => (
            <div key={String(label)} className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                <span className="font-medium text-[#0b1426] text-sm">{String(label)}</span>
              </div>
              <Badge text="Verified" color="green" />
            </div>
          ))}
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">Pending Verifications</h3>
          <Badge text="27 pending" color="yellow" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <THead cols={["Name", "Email", "Country", "Actions"]} />
            <tbody>
              {(pending as typeof pending).map(p => (
                <tr key={String(p._id)} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#0b1426]">{String(p.firstName)} {String(p.lastName)}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{String(p.email)}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{String(p.country)}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="text-xs font-bold text-[#00d4a3] hover:underline">Approve</button>
                      <button className="text-xs font-bold text-red-400 hover:underline">Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ── 11. Support ── */
function Support() {
  const [tickets, setTickets] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetch("/api/tickets?limit=10")
      .then(r => r.json())
      .then(d => { if (d.success && d.data.length) setTickets(d.data); })
      .catch(() => {});
  }, []);

  const staticTickets = [
    { _id: "1", user: { firstName: "Carlos", lastName: "V." }, subject: "Task rejected without explanation",          priority: "High",   status: "Open",        agent: "Sarah M.", createdAt: "10 min ago" },
    { _id: "2", user: { firstName: "Amara",  lastName: "K." }, subject: "Payout not received after 72 hours",        priority: "High",   status: "In Progress", agent: "James O.", createdAt: "2 hrs ago"  },
    { _id: "3", user: { firstName: "Diego",  lastName: "R." }, subject: "Cannot access Premium tasks after upgrade",  priority: "Medium", status: "Resolved",    agent: "Lena S.",  createdAt: "4 hrs ago"  },
    { _id: "4", user: { firstName: "Priya",  lastName: "M." }, subject: "Training module not loading on mobile",     priority: "Low",    status: "Resolved",    agent: "James O.", createdAt: "1 day ago"  },
    { _id: "5", user: { firstName: "Yuki",   lastName: "T." }, subject: "Verification document upload failing",       priority: "Medium", status: "Open",        agent: "—",        createdAt: "2 days ago" },
  ];

  const display = tickets.length > 0 ? tickets : staticTickets;
  const pColor  = (p: string): BadgeColor => p === "High" ? "red" : p === "Medium" ? "yellow" : "green";
  const sColor  = (s: string): BadgeColor => s === "Open" ? "red" : s === "In Progress" ? "yellow" : "green";

  return (
    <div className="space-y-6">
      <SecHead title="Support Center" sub="Manage all worker support tickets and escalations." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Tickets"  value="14"  sub="3 high priority"    icon="🔴" color="text-red-500"   />
        <StatCard label="In Progress"   value="8"   sub="Assigned to agents" icon="🟡" color="text-[#f59e0b]" />
        <StatCard label="Resolved (7d)" value="62"  sub="Avg 3.2 hr resolve" icon="🟢" color="text-[#00d4a3]" />
        <StatCard label="Satisfaction"  value="96%" sub="Positive ratings"   icon="⭐" color="text-[#3b82f6]" />
      </div>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-4">Quick Response</h3>
        <div className="grid sm:grid-cols-3 gap-3 mb-3">
          <input placeholder="Ticket ID e.g. #2041" className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4a3] transition-all" />
          <select className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#00d4a3] transition-all">
            <option>Use template…</option>
            <option>Payout Delay Response</option>
            <option>Task Rejection Explanation</option>
            <option>Account Access Help</option>
          </select>
          <button className="bg-[#0b1426] hover:bg-[#152236] text-white font-bold py-2.5 rounded-xl text-sm transition-all">Send Response</button>
        </div>
        <textarea rows={3} placeholder="Type your response here…" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] transition-all resize-none" />
      </Card>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">All Tickets</h3>
          <button className="text-xs text-[#00d4a3] font-semibold hover:underline">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <THead cols={["User", "Subject", "Priority", "Status", "Agent", "Time", "Action"]} />
            <tbody>
              {(display as typeof staticTickets).map(t => (
                <tr key={String(t._id)} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#0b1426] text-sm whitespace-nowrap">
                    {typeof t.user === "object" && t.user !== null ? `${(t.user as Record<string,string>).firstName} ${(t.user as Record<string,string>).lastName}` : "—"}
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-sm max-w-xs truncate">{String(t.subject)}</td>
                  <td className="py-3 px-4"><Badge text={String(t.priority)} color={pColor(String(t.priority))} /></td>
                  <td className="py-3 px-4"><Badge text={String(t.status)}   color={sColor(String(t.status))}   /></td>
                  <td className="py-3 px-4 text-slate-500 text-xs whitespace-nowrap">{String(t.agent ?? "—")}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs whitespace-nowrap">{String(t.createdAt ?? "—")}</td>
                  <td className="py-3 px-4"><button className="text-xs text-[#00d4a3] hover:underline font-semibold">Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ── 12. Review ── */
function Review() {
  const [selected,  setSelected]  = useState<number | null>(null);
  const [decisions, setDecisions] = useState<Record<number, string>>({});
  const [note,      setNote]      = useState("");

  const queue = [
    { id: 1, taskId: "T-2041", worker: "Carlos V.",  project: "Data Review",    time: "9:14am", acc: 71, flags: ["Inconsistent labels", "3 blank fields"], risk: "High"   },
    { id: 2, taskId: "T-2043", worker: "Priya M.",   project: "Content QA",     time: "8:45am", acc: 88, flags: ["Minor phrasing issue"],                  risk: "Low"    },
    { id: 3, taskId: "T-2050", worker: "James O.",   project: "Image Labeling", time: "8:12am", acc: 65, flags: ["Missing bounding boxes", "Wrong class"], risk: "High"   },
    { id: 4, taskId: "T-2051", worker: "Lena S.",    project: "AI Annotation",  time: "7:55am", acc: 92, flags: [],                                         risk: "None"   },
    { id: 5, taskId: "T-2052", worker: "Michael T.", project: "Video Labeling", time: "7:30am", acc: 78, flags: ["Timestamp drift"],                        risk: "Medium" },
  ];
  const rColor = (r: string): BadgeColor => r === "High" ? "red" : r === "Medium" ? "yellow" : r === "Low" ? "blue" : "green";
  const item   = queue.find(q => q.id === selected) ?? null;

  return (
    <div className="space-y-6">
      <SecHead title="Task Review System" sub="QA queue — approve, flag, or reject worker submissions." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Review" value="12"   sub="Oldest: 4 hrs ago"  icon="⏳" color="text-[#f59e0b]" />
        <StatCard label="High Risk"      value="3"    sub="Needs urgent review" icon="🔴" color="text-red-500"   />
        <StatCard label="Approved Today" value="48"   sub="Auto + manual"       icon="✅" color="text-[#00d4a3]" />
        <StatCard label="Rejection Rate" value="6.2%" sub="-0.8% vs last week"  icon="📉" color="text-[#3b82f6]" />
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Queue */}
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100"><h3 className="font-black text-[#0b1426]">Review Queue</h3></div>
          <div className="divide-y divide-slate-100">
            {queue.map(q => (
              <div key={q.id} onClick={() => { setSelected(q.id); setNote(""); }}
                className={`px-5 py-4 cursor-pointer transition-all ${selected === q.id ? "bg-[#00d4a3]/8 border-l-4 border-[#00d4a3]" : "hover:bg-slate-50"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-slate-400">{q.taskId}</span>
                      <Badge text={q.risk === "None" ? "Clean" : q.risk + " Risk"} color={rColor(q.risk)} />
                    </div>
                    <p className="font-semibold text-[#0b1426] text-sm">{q.worker}</p>
                    <p className="text-slate-400 text-xs">{q.project} · {q.time}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`font-black text-lg ${q.acc >= 85 ? "text-[#00d4a3]" : q.acc >= 75 ? "text-[#f59e0b]" : "text-red-500"}`}>{q.acc}%</p>
                    <p className="text-slate-400 text-xs">accuracy</p>
                  </div>
                </div>
                {q.flags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {q.flags.map(f => <span key={f} className="text-xs bg-red-50 text-red-500 border border-red-100 px-2 py-0.5 rounded-full">{f}</span>)}
                  </div>
                )}
                {decisions[q.id] && (
                  <p className={`mt-1.5 text-xs font-bold ${decisions[q.id] === "Approved" ? "text-[#00d4a3]" : decisions[q.id] === "Flagged" ? "text-[#f59e0b]" : "text-red-500"}`}>
                    → {decisions[q.id]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Panel */}
        <Card className="p-6">
          {item ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-slate-400">{item.taskId}</span>
                  <Badge text={item.risk === "None" ? "Clean" : item.risk + " Risk"} color={rColor(item.risk)} />
                </div>
                <h3 className="font-black text-[#0b1426] text-xl">{item.worker}</h3>
                <p className="text-slate-400 text-sm">{item.project} · Submitted {item.time}</p>
              </div>
              <div className="bg-[#f8fafc] rounded-2xl p-4">
                <p className="text-slate-500 text-xs mb-2 font-semibold uppercase tracking-wide">Accuracy Score</p>
                <p className={`text-5xl font-black mb-2 ${item.acc >= 85 ? "text-[#00d4a3]" : item.acc >= 75 ? "text-[#f59e0b]" : "text-red-500"}`}>{item.acc}%</p>
                <Bar value={item.acc} color={item.acc >= 85 ? "#00d4a3" : item.acc >= 75 ? "#f59e0b" : "#ef4444"} />
                <p className="text-slate-400 text-xs mt-2">
                  {item.acc >= 85 ? "Meets quality standard ✓" : item.acc >= 75 ? "Below standard — review flags" : "Fails quality standard"}
                </p>
              </div>
              {item.flags.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Quality Flags</p>
                  <div className="space-y-1.5">
                    {item.flags.map(f => (
                      <div key={f} className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        <span className="text-red-400 text-xs">⚠️</span>
                        <span className="text-red-600 text-xs font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Reviewer Note</p>
                <textarea rows={3} value={note} onChange={e => setNote(e.target.value)}
                  placeholder="Add feedback for the worker (optional)…"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(["Approved", "Flagged", "Rejected"] as const).map(d => (
                  <button key={d} onClick={() => setDecisions(p => ({ ...p, [item.id]: d }))}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${
                      decisions[item.id] === d
                        ? d === "Approved" ? "bg-[#00d4a3] text-[#0b1426]" : d === "Flagged" ? "bg-[#f59e0b] text-[#0b1426]" : "bg-red-500 text-white"
                        : d === "Approved" ? "bg-[#00d4a3]/10 text-[#00d4a3] hover:bg-[#00d4a3]/20" : d === "Flagged" ? "bg-amber-50 text-[#f59e0b] hover:bg-amber-100" : "bg-red-50 text-red-500 hover:bg-red-100"
                    }`}>
                    {d === "Approved" ? "✅" : d === "Flagged" ? "🚩" : "❌"} {d}
                  </button>
                ))}
              </div>
              {decisions[item.id] && (
                <button onClick={() => setSelected(null)} className="w-full bg-[#0b1426] hover:bg-[#152236] text-white font-bold py-3 rounded-xl text-sm transition-all">
                  Submit & Next →
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-5xl mb-4">👈</div>
              <h3 className="font-black text-[#0b1426] mb-2">Select a Task to Review</h3>
              <p className="text-slate-400 text-sm">Click any item in the queue to open it here.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROOT ADMIN PAGE
   renderSection() switch — only the active
   section mounts, no SECTIONS={} Record.
═══════════════════════════════════════════ */
function renderSection(s: Section) {
  switch (s) {
    case "overview":      return <Overview      />;
    case "projects":      return <Projects      />;
    case "training":      return <Training      />;
    case "earnings":      return <Earnings      />;
    case "quality":       return <Quality       />;
    case "management":    return <Management    />;
    case "payments":      return <Payments      />;
    case "notifications": return <Notifications />;
    case "analytics":     return <Analytics     />;
    case "security":      return <Security      />;
    case "support":       return <Support       />;
    case "review":        return <Review        />;
  }
}

export default function AdminDashboard() {
  const [active,      setActive]      = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentLabel = NAV.find(n => n.id === active)?.label ?? "";

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0b1426] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 mb-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">TN</span>
            <span className="text-white font-bold text-lg">Task<span className="text-[#00d4a3]">Nest</span></span>
          </Link>
          <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#00d4a3] animate-pulse" />
            <span className="text-[#00d4a3] text-xs font-bold">Admin Dashboard</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV.map(({ id, label, icon, badge }) => (
            <button key={id}
              onClick={() => { setActive(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                active === id ? "bg-[#00d4a3]/15 text-[#00d4a3] border border-[#00d4a3]/20" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base w-5 shrink-0 text-center">{icon}</span>
              <span className="flex-1 leading-tight">{label}</span>
              {badge && <span className="text-xs bg-[#00d4a3] text-[#0b1426] font-black px-1.5 py-0.5 rounded-full">{badge}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#00d4a3]/20 flex items-center justify-center text-[#00d4a3] font-black text-xs shrink-0">AD</div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">Admin User</p>
            <p className="text-slate-500 text-xs truncate">admin@tasknest.io</p>
          </div>
          <Link href="/" className="text-slate-500 hover:text-white text-xs transition-colors shrink-0">← Site</Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-black text-[#0b1426] leading-tight">{currentLabel}</h1>
              <p className="text-slate-400 text-xs hidden sm:block">
                {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setActive("notifications")} className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#00d4a3]" />
            </button>
            <div className="h-8 w-8 rounded-lg bg-[#0b1426] flex items-center justify-center text-[#00d4a3] font-black text-xs">AD</div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {renderSection(active)}
        </main>
      </div>
    </div>
  );
}