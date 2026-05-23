"use client";
import { useState } from "react";
import Link from "next/link";
 
/* ═══════════════════════════════════════════
   TYPES
═══════════════════════════════════════════ */
type Section =
  | "overview" | "projects" | "training" | "earnings"
  | "quality"  | "management" | "payments" | "notifications"
  | "analytics"| "security"  | "support"  | "review";
 
/* ═══════════════════════════════════════════
   SIDEBAR CONFIG
═══════════════════════════════════════════ */
const NAV: { id: Section; label: string; icon: string; badge?: string }[] = [
  { id: "overview",      label: "Overview",               icon: "🏠"              },
  { id: "projects",      label: "Available Projects",     icon: "📋", badge: "6"  },
  { id: "training",      label: "Training & Quals",       icon: "🎓"              },
  { id: "earnings",      label: "Earnings Dashboard",     icon: "💰"              },
  { id: "quality",       label: "Quality & Accuracy",     icon: "🎯"              },
  { id: "management",    label: "Project Management",     icon: "🗂️"              },
  { id: "payments",      label: "Payments & Settings",    icon: "💳"              },
  { id: "notifications", label: "Notifications",          icon: "🔔", badge: "3"  },
  { id: "analytics",     label: "Community Analytics",    icon: "📊"              },
  { id: "security",      label: "Verification & Security",icon: "🔒"              },
  { id: "support",       label: "Support Center",         icon: "🛟"              },
  { id: "review",        label: "Task Review System",     icon: "✅", badge: "12" },
];
 
/* ═══════════════════════════════════════════
   SHARED PRIMITIVES
═══════════════════════════════════════════ */
function StatCard({ label, value, sub, color = "text-[#00d4a3]", icon }: {
  label: string; value: string; sub: string; color?: string; icon: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">{label}</p>
        <span className="text-xl">{icon}</span>
      </div>
      <p className={`text-3xl font-black ${color} mb-0.5`}>{value}</p>
      <p className="text-slate-400 text-xs">{sub}</p>
    </div>
  );
}
 
function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-black text-[#0b1426]">{title}</h2>
      <p className="text-slate-400 text-sm mt-1">{sub}</p>
    </div>
  );
}
 
function Badge({ text, color }: {
  text: string;
  color: "green" | "yellow" | "red" | "blue" | "purple" | "gray";
}) {
  const cls = {
    green:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    yellow: "bg-amber-50   text-amber-700   border-amber-200",
    red:    "bg-red-50     text-red-700     border-red-200",
    blue:   "bg-blue-50    text-blue-700    border-blue-200",
    purple: "bg-purple-50  text-purple-700  border-purple-200",
    gray:   "bg-slate-100  text-slate-500   border-slate-200",
  }[color];
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${cls}`}>
      {text}
    </span>
  );
}
 
function Bar({ value, color = "#00d4a3" }: { value: number; color?: string }) {
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}
 
function TableHead({ cols }: { cols: string[] }) {
  return (
    <thead className="bg-[#0b1426]">
      <tr>
        {cols.map(c => (
          <th key={c} className="text-left py-3 px-4 text-slate-400 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
            {c}
          </th>
        ))}
      </tr>
    </thead>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 1 — OVERVIEW
═══════════════════════════════════════════ */
function Overview() {
  const activity = [
    { user: "Amara K.",  action: "Completed AI Annotation task",      pay: "+$85.00",  time: "2m ago",  av: "AK", c: "#00d4a3" },
    { user: "Diego R.",  action: "Submitted Medical Image review",    pay: "+$120.00", time: "14m ago", av: "DR", c: "#3b82f6" },
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
  return (
    <div className="space-y-6">
      <SectionHeader title="Admin Overview" sub="Platform health at a glance." />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Workers"   value="12,418" sub="+124 this week"       icon="👥" color="text-[#0b1426]" />
        <StatCard label="Active Tasks"    value="38"     sub="6 pending review"     icon="📋" color="text-[#00d4a3]" />
        <StatCard label="Today's Payouts" value="$8,240" sub="142 transactions"     icon="💸" color="text-[#f59e0b]" />
        <StatCard label="Avg Accuracy"    value="94.2%"  sub="+1.3% from last week" icon="🎯" color="text-[#3b82f6]" />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Open Tickets"         value="14"   sub="3 critical"          icon="🛟" color="text-red-500"    />
        <StatCard label="Pending Verifications" value="27"   sub="Avg wait 6 hrs"      icon="🔒" color="text-purple-500" />
        <StatCard label="Tasks Under Review"   value="12"   sub="Flagged for QA"      icon="✅" color="text-[#0b1426]"  />
        <StatCard label="Monthly Revenue"      value="$92k" sub="+18% vs last month"  icon="📈" color="text-[#00d4a3]"  />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
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
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
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
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 2 — PROJECTS
═══════════════════════════════════════════ */
function Projects() {
  const [filter, setFilter] = useState("All");
  const projects = [
    { id: "P-1041", title: "E-commerce Product Categorisation", client: "ShopGlobal Inc.",  cat: "Data Review",    plan: "Basic",   pay: "$8–$15",   slots: 12, filled: 8,  deadline: "May 23", status: "Active",  diff: "Beginner"     },
    { id: "P-1042", title: "Conversational AI Annotation",      client: "DeepMind Labs",    cat: "AI Training",    plan: "Basic",   pay: "$18–$35",  slots: 6,  filled: 4,  deadline: "May 25", status: "Active",  diff: "Intermediate" },
    { id: "P-1043", title: "Medical Image Classification",      client: "HealthAI Corp",    cat: "Image Labeling", plan: "Premium", pay: "$40–$80",  slots: 4,  filled: 1,  deadline: "May 28", status: "Active",  diff: "Advanced"     },
    { id: "P-1044", title: "Multilingual Content Review",       client: "TranslatePro",     cat: "Content QA",     plan: "Premium", pay: "$25–$50",  slots: 8,  filled: 3,  deadline: "May 30", status: "Active",  diff: "Intermediate" },
    { id: "P-1045", title: "Autonomous Driving Scene Tagging",  client: "AutoVision AI",    cat: "Video Labeling", plan: "Premium", pay: "$60–$120", slots: 3,  filled: 0,  deadline: "Jun 2",  status: "Active",  diff: "Advanced"     },
    { id: "P-1046", title: "Brand Perception Survey",           client: "Insights Co.",     cat: "Survey",         plan: "Basic",   pay: "$5–$10",   slots: 20, filled: 15, deadline: "May 22", status: "Closing", diff: "Beginner"     },
    { id: "P-1047", title: "Legal Document Review",             client: "LexAI",            cat: "Document QA",    plan: "Premium", pay: "$80–$150", slots: 2,  filled: 0,  deadline: "Jun 5",  status: "Draft",   diff: "Advanced"     },
    { id: "P-1048", title: "Social Media Sentiment Analysis",   client: "BrandWatch",       cat: "Data Review",    plan: "Basic",   pay: "$12–$20",  slots: 10, filled: 2,  deadline: "Jun 1",  status: "Active",  diff: "Beginner"     },
  ];
  const statuses = ["All", ...Array.from(new Set(projects.map(p => p.status)))];
  const filtered = filter === "All" ? projects : projects.filter(p => p.status === filter);
  return (
    <div className="space-y-6">
      <SectionHeader title="Available Projects" sub="Manage all active, draft, and closing task projects." />
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Active"    value="6" sub="Taking submissions" icon="🟢" color="text-[#00d4a3]" />
        <StatCard label="Closing"   value="1" sub="Slots nearly full"  icon="🟡" color="text-[#f59e0b]" />
        <StatCard label="Draft"     value="1" sub="Awaiting approval"  icon="⚪" color="text-slate-400"  />
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${filter === s ? "bg-[#0b1426] text-white" : "bg-white border border-slate-200 text-slate-500 hover:border-slate-300"}`}>
            {s}
          </button>
        ))}
        <button className="ml-auto px-4 py-2 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold rounded-full text-sm">
          + New Project
        </button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead cols={["ID", "Project", "Client", "Plan", "Pay", "Slots", "Deadline", "Status", "Actions"]} />
            <tbody>
              {filtered.map((p, i) => (
                <tr key={p.id} className={`border-t border-slate-100 hover:bg-[#00d4a3]/5 transition-colors ${i % 2 !== 0 ? "bg-slate-50/50" : ""}`}>
                  <td className="py-3 px-4 text-slate-400 text-xs font-mono">{p.id}</td>
                  <td className="py-3 px-4">
                    <p className="font-semibold text-[#0b1426] text-sm">{p.title}</p>
                    <p className="text-slate-400 text-xs">{p.cat} · {p.diff}</p>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs whitespace-nowrap">{p.client}</td>
                  <td className="py-3 px-4"><Badge text={p.plan} color={p.plan === "Premium" ? "yellow" : "blue"} /></td>
                  <td className="py-3 px-4 font-bold text-[#0b1426] whitespace-nowrap">{p.pay}</td>
                  <td className="py-3 px-4 min-w-[100px]">
                    <div className="text-xs text-slate-500 mb-1">{p.filled}/{p.slots}</div>
                    <Bar value={Math.round((p.filled / p.slots) * 100)} />
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-xs whitespace-nowrap">{p.deadline}</td>
                  <td className="py-3 px-4">
                    <Badge text={p.status} color={p.status === "Active" ? "green" : p.status === "Closing" ? "yellow" : "purple"} />
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
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 3 — TRAINING
═══════════════════════════════════════════ */
function Training() {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const modules = [
    { id: 1, title: "Platform Orientation",         level: "Beginner",     dur: "20 min", enrolled: 4821, passed: 4512, score: 94, required: true,  done: true  },
    { id: 2, title: "Data Labeling Fundamentals",   level: "Beginner",     dur: "35 min", enrolled: 3940, passed: 3601, score: 91, required: true,  done: true  },
    { id: 3, title: "AI Annotation Best Practices", level: "Intermediate", dur: "50 min", enrolled: 2140, passed: 1820, score: 85, required: false, done: true  },
    { id: 4, title: "Image & Video Labeling",        level: "Intermediate", dur: "45 min", enrolled: 1880, passed: 1540, score: 82, required: false, done: false },
    { id: 5, title: "Medical Data Handling",         level: "Advanced",     dur: "60 min", enrolled: 640,  passed: 490,  score: 77, required: false, done: false },
    { id: 6, title: "Legal & Compliance Review",     level: "Advanced",     dur: "55 min", enrolled: 310,  passed: 228,  score: 74, required: false, done: false },
  ];
  const myProgress = [
    { module: "Platform Orientation",         score: 98 },
    { module: "Data Labeling Fundamentals",   score: 92 },
    { module: "AI Annotation Best Practices", score: 88 },
  ];
  const levelColor = (l: string): "green" | "blue" | "purple" =>
    l === "Beginner" ? "green" : l === "Intermediate" ? "blue" : "purple";
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Training & Qualification Center" sub="Complete modules to unlock higher-paying task categories." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Modules"       value="6"     sub="2 advanced locked"    icon="📚" color="text-[#0b1426]" />
        <StatCard label="Completions"   value="3/6"   sub="3 remaining"          icon="🎓" color="text-[#00d4a3]" />
        <StatCard label="Avg Score"     value="92.7%" sub="Above platform avg"   icon="🏆" color="text-[#f59e0b]" />
        <StatCard label="Current Level" value="Inter" sub="Intermediate"         icon="⭐" color="text-[#3b82f6]" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-black text-[#0b1426] mb-4">My Qualification Progress</h3>
        <div className="space-y-4">
          {myProgress.map(({ module, score }) => (
            <div key={module} className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-lg bg-[#00d4a3]/15 flex items-center justify-center shrink-0">
                <svg className="h-4 w-4 text-[#00d4a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[#0b1426] font-semibold text-sm mb-1">{module}</p>
                <Bar value={score} color="#00d4a3" />
              </div>
              <div className="text-right shrink-0">
                <p className="text-[#0b1426] font-black text-sm">{score}%</p>
                <Badge text="Passed" color="green" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {modules.map((m) => (
          <div key={m.id} className={`bg-white border rounded-2xl p-5 transition-all ${activeModule === m.id ? "border-[#00d4a3]/40 shadow-md" : "border-slate-200"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 font-black text-sm ${m.done ? "bg-[#00d4a3]/15 text-[#00d4a3]" : "bg-slate-100 text-slate-400"}`}>
                  {m.done ? "✓" : m.id}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h4 className="font-bold text-[#0b1426] text-sm">{m.title}</h4>
                    {m.required && <Badge text="Required" color="red" />}
                    <Badge text={m.level} color={levelColor(m.level)} />
                  </div>
                  <p className="text-slate-400 text-xs">{m.dur} · {m.enrolled.toLocaleString()} enrolled · {Math.round((m.passed / m.enrolled) * 100)}% pass rate</p>
                </div>
              </div>
              <button
                onClick={() => setActiveModule(activeModule === m.id ? null : m.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${m.done ? "bg-slate-100 text-slate-500" : "bg-[#0b1426] hover:bg-[#152236] text-white"}`}
              >
                {m.done ? "Review" : "Start"}
              </button>
            </div>
            {activeModule === m.id && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-slate-500 text-sm mb-4">This module covers skills required to complete {m.level.toLowerCase()} tasks. Pass with 70%+ to unlock the task category.</p>
                <div className="grid grid-cols-3 gap-3 text-center mb-4">
                  {[["Enrolled", m.enrolled.toLocaleString()], ["Pass Rate", `${Math.round((m.passed / m.enrolled) * 100)}%`], ["Avg Score", `${m.score}%`]].map(([l, v]) => (
                    <div key={l} className="bg-[#f8fafc] rounded-xl p-3">
                      <p className="text-[#0b1426] font-black text-lg">{v}</p>
                      <p className="text-slate-400 text-xs">{l}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold py-2.5 rounded-xl text-sm transition-all">
                  {m.done ? "Retake Module" : "Begin Module →"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 4 — EARNINGS
═══════════════════════════════════════════ */
function Earnings() {
  const history = [
    { date: "May 19", task: "AI Annotation — Batch #14",        amount: "$85.00",  status: "Paid",    method: "PayPal" },
    { date: "May 18", task: "Medical Image Review #008",         amount: "$120.00", status: "Paid",    method: "Wise"   },
    { date: "May 18", task: "Content QA — FR/EN Set B",          amount: "$47.50",  status: "Paid",    method: "PayPal" },
    { date: "May 17", task: "Brand Survey Batch #22",            amount: "$28.00",  status: "Paid",    method: "Bank"   },
    { date: "May 16", task: "Driving Scene Tagging — Set 4",     amount: "$115.00", status: "Pending", method: "Wise"   },
    { date: "May 15", task: "E-commerce Categorisation #31",     amount: "$14.00",  status: "Paid",    method: "PayPal" },
    { date: "May 14", task: "AI Annotation — Batch #12",         amount: "$92.00",  status: "Paid",    method: "PayPal" },
    { date: "May 13", task: "Multilingual Review — ES/EN",       amount: "$38.00",  status: "Paid",    method: "Bank"   },
  ];
  const weekly = [
    { day: "Mon", amount: 120 }, { day: "Tue", amount: 85  },
    { day: "Wed", amount: 210 }, { day: "Thu", amount: 95  },
    { day: "Fri", amount: 175 }, { day: "Sat", amount: 310 },
    { day: "Sun", amount: 145 },
  ];
  const maxBar = Math.max(...weekly.map(w => w.amount));
  return (
    <div className="space-y-6">
      <SectionHeader title="Earnings Dashboard" sub="Track your income, payouts, and payment history." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today"        value="$342.50" sub="+12% from yesterday"  icon="💰" color="text-[#00d4a3]" />
        <StatCard label="This Week"    value="$1,140"  sub="7 tasks completed"    icon="📅" color="text-[#0b1426]" />
        <StatCard label="This Month"   value="$4,280"  sub="Best month yet 🎉"    icon="📆" color="text-[#f59e0b]" />
        <StatCard label="Pending"      value="$115.00" sub="Processing in 18 hrs" icon="⏳" color="text-[#3b82f6]" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-[#0b1426]">This Week&apos;s Earnings</h3>
          <span className="text-[#00d4a3] text-sm font-bold">$1,140 total</span>
        </div>
        <div className="flex items-end gap-3 h-40">
          {weekly.map(({ day, amount }) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-2">
              <p className="text-xs font-bold text-[#0b1426]">${amount}</p>
              <div className="w-full rounded-t-lg"
                style={{ height: `${(amount / maxBar) * 120}px`, background: day === "Sat" ? "#00d4a3" : "#0b1426" }} />
              <p className="text-xs text-slate-400">{day}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#0b1426] to-[#152236] border border-[#00d4a3]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white font-black text-xl mb-0.5">Available Balance: <span className="text-[#00d4a3]">$227.50</span></p>
          <p className="text-slate-400 text-sm">Minimum payout $10. Premium payouts process within 24 hrs.</p>
        </div>
        <button className="shrink-0 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold px-6 py-3 rounded-xl text-sm transition-all">
          Request Payout →
        </button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">Payment History</h3>
          <button className="text-xs text-[#00d4a3] font-semibold hover:underline">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead cols={["Date", "Task", "Amount", "Method", "Status"]} />
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-slate-400 text-xs whitespace-nowrap">{h.date}</td>
                  <td className="py-3 px-4 text-[#0b1426] font-medium">{h.task}</td>
                  <td className="py-3 px-4 font-black text-[#0b1426]">{h.amount}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{h.method}</td>
                  <td className="py-3 px-4"><Badge text={h.status} color={h.status === "Paid" ? "green" : "yellow"} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 5 — QUALITY
═══════════════════════════════════════════ */
function Quality() {
  const workers = [
    { name: "Amara K.",  tasks: 142, acc: 98, speed: "22 min", streak: 14, tier: "Elite"    },
    { name: "Priya M.",  tasks: 118, acc: 96, speed: "28 min", streak: 9,  tier: "Elite"    },
    { name: "Diego R.",  tasks: 93,  acc: 91, speed: "35 min", streak: 5,  tier: "Pro"      },
    { name: "James O.",  tasks: 74,  acc: 88, speed: "41 min", streak: 3,  tier: "Pro"      },
    { name: "Lena S.",   tasks: 61,  acc: 84, speed: "44 min", streak: 1,  tier: "Standard" },
    { name: "Carlos V.", tasks: 32,  acc: 72, speed: "58 min", streak: 0,  tier: "Watch"    },
  ];
  const tierColor = (t: string): "green" | "blue" | "yellow" | "red" =>
    t === "Elite" ? "green" : t === "Pro" ? "blue" : t === "Standard" ? "yellow" : "red";
  const cats = [
    { cat: "AI Annotation",   score: 96, color: "#00d4a3" },
    { cat: "Data Review",     score: 93, color: "#3b82f6" },
    { cat: "Content QA",      score: 91, color: "#8b5cf6" },
    { cat: "Image Labeling",  score: 88, color: "#f59e0b" },
    { cat: "Video Labeling",  score: 85, color: "#ef4444" },
    { cat: "Document Review", score: 79, color: "#ec4899" },
  ];
  return (
    <div className="space-y-6">
      <SectionHeader title="Quality & Accuracy Monitoring" sub="Track worker performance and maintain platform quality standards." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Platform Accuracy" value="94.2%" sub="+1.3% this week"      icon="🎯" color="text-[#00d4a3]" />
        <StatCard label="Elite Workers"     value="284"   sub="Top 2.3% performers"  icon="🏆" color="text-[#f59e0b]" />
        <StatCard label="On Watch List"     value="38"    sub="Accuracy below 75%"   icon="⚠️" color="text-red-500"   />
        <StatCard label="Avg Task Speed"    value="34 min" sub="-3 min from last wk" icon="⚡" color="text-[#3b82f6]" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Accuracy by Task Category</h3>
        <div className="space-y-4">
          {cats.map(({ cat, score, color }) => (
            <div key={cat}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-slate-600 font-medium">{cat}</span>
                <span className="text-sm font-black text-[#0b1426]">{score}%</span>
              </div>
              <Bar value={score} color={color} />
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-black text-[#0b1426]">Top Performer Leaderboard</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead cols={["Rank", "Worker", "Tasks", "Accuracy", "Avg Speed", "Streak", "Tier"]} />
            <tbody>
              {workers.map((w, i) => (
                <tr key={w.name} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-black text-sm">
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}
                  </td>
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
                  <td className="py-3 px-4"><Badge text={w.tier} color={tierColor(w.tier)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 6 — MANAGEMENT
═══════════════════════════════════════════ */
function Management() {
  const pipeline = [
    { stage: "Submitted",  count: 4,  color: "#3b82f6" },
    { stage: "In Review",  count: 7,  color: "#f59e0b" },
    { stage: "Approved",   count: 6,  color: "#00d4a3" },
    { stage: "Live",       count: 6,  color: "#0b1426" },
    { stage: "Closing",    count: 1,  color: "#8b5cf6" },
    { stage: "Completed",  count: 34, color: "#64748b" },
  ];
  const queue = [
    { id: "T-2041", worker: "Amara K.",  project: "AI Annotation",    time: "Today 9:14am", status: "Under Review", flag: false },
    { id: "T-2042", worker: "Diego R.",  project: "Medical Imaging",  time: "Today 9:02am", status: "Approved",     flag: false },
    { id: "T-2043", worker: "Priya M.",  project: "Content QA",       time: "Today 8:45am", status: "Flagged",      flag: true  },
    { id: "T-2044", worker: "Leo F.",    project: "Brand Survey",      time: "Yesterday",    status: "Approved",     flag: false },
    { id: "T-2045", worker: "Carlos V.", project: "Data Review",       time: "Yesterday",    status: "Rejected",     flag: true  },
  ];
  const sColor = (s: string): "yellow" | "green" | "red" =>
    s === "Approved" ? "green" : s === "Flagged" || s === "Rejected" ? "red" : "yellow";
  return (
    <div className="space-y-6">
      <SectionHeader title="Project Management Panel" sub="Full lifecycle control over tasks and worker submissions." />
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Project Pipeline</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {pipeline.map(({ stage, count, color }) => (
            <div key={stage} className="text-center p-4 bg-[#f8fafc] rounded-2xl border border-slate-100">
              <p className="text-3xl font-black mb-1" style={{ color }}>{count}</p>
              <p className="text-slate-400 text-xs">{stage}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <button className="flex items-center justify-center gap-2 bg-[#00d4a3] text-[#0b1426] font-bold py-3 px-5 rounded-xl text-sm hover:opacity-90 transition-all">➕ Create New Project</button>
        <button className="flex items-center justify-center gap-2 bg-[#0b1426] text-white font-bold py-3 px-5 rounded-xl text-sm hover:bg-[#152236] transition-all">✅ Bulk Approve Tasks</button>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-[#0b1426] font-bold py-3 px-5 rounded-xl text-sm hover:border-slate-300 transition-all">📥 Export Report</button>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-black text-[#0b1426]">Task Submission Queue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead cols={["Task ID", "Worker", "Project", "Submitted", "Status", "Actions"]} />
            <tbody>
              {queue.map((t) => (
                <tr key={t.id} className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${t.flag ? "bg-red-50/30" : ""}`}>
                  <td className="py-3 px-4 text-slate-400 text-xs font-mono">{t.id}</td>
                  <td className="py-3 px-4 font-semibold text-[#0b1426] text-sm">{t.worker}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{t.project}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs whitespace-nowrap">{t.time}</td>
                  <td className="py-3 px-4"><Badge text={t.status} color={sColor(t.status)} /></td>
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
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 7 — PAYMENTS  (no hooks in map!)
═══════════════════════════════════════════ */
const NOTIF_DEFAULTS = [
  { label: "New task available",         on: true  },
  { label: "Task approved / rejected",   on: true  },
  { label: "Payout processed",           on: true  },
  { label: "Weekly earnings summary",    on: false },
  { label: "Platform announcements",     on: true  },
  { label: "New training modules",       on: false },
];
 
function Payments() {
  const [saved, setSaved]   = useState(false);
  const [toggles, setToggles] = useState(() => NOTIF_DEFAULTS.map(n => n.on));
 
  const flipToggle = (i: number) =>
    setToggles(prev => prev.map((v, idx) => (idx === i ? !v : v)));
 
  const payoutMethods = [
    { method: "PayPal",        account: "jane@example.com", primary: true  },
    { method: "Wise",          account: "+254 712 345 678", primary: false },
    { method: "Bank Transfer", account: "KE ···· 4421",     primary: false },
  ];
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Payments & Settings" sub="Manage your payout method, plan, and account preferences." />
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Payout methods */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-black text-[#0b1426] mb-4">Payout Methods</h3>
          <div className="space-y-3">
            {payoutMethods.map(({ method, account, primary }) => (
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
        </div>
        {/* Plan */}
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
                <svg className="h-4 w-4 text-[#f59e0b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {f}
              </div>
            ))}
          </div>
          <button className="w-full border border-white/20 hover:border-white/40 text-white font-semibold py-2.5 rounded-xl text-sm transition-all">
            Manage Subscription
          </button>
        </div>
      </div>
      {/* Account prefs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Account Preferences</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { label: "Full Name", value: "Jane Doe",         type: "text"  },
            { label: "Email",     value: "jane@example.com", type: "email" },
            { label: "Country",   value: "Kenya",            type: "text"  },
            { label: "Language",  value: "English",          type: "text"  },
          ].map(({ label, value, type }) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">{label}</label>
              <input type={type} defaultValue={value} className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#0b1426] focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all" />
            </div>
          ))}
        </div>
        <button
          onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className="mt-5 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold px-6 py-2.5 rounded-xl text-sm transition-all"
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
      {/* Notification toggles — state stored in array, no hook in map */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Notification Preferences</h3>
        <div className="space-y-4">
          {NOTIF_DEFAULTS.map(({ label }, i) => (
            <div key={label} className="flex items-center justify-between py-1">
              <span className="text-[#0b1426] font-medium text-sm">{label}</span>
              <button
                onClick={() => flipToggle(i)}
                className={`relative h-6 w-11 rounded-full transition-all duration-200 ${toggles[i] ? "bg-[#00d4a3]" : "bg-slate-200"}`}
              >
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${toggles[i] ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 8 — NOTIFICATIONS
═══════════════════════════════════════════ */
function Notifications() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const announcements = [
    { id: 1, type: "New",    title: "New Premium Tasks Available",    body: "5 new advanced tasks have been added — Medical AI, Legal Review, and 3 more. Premium members get first access for 12 hours.", time: "10 min ago", pinned: true  },
    { id: 2, type: "Update", title: "Payout Processing — May 19",    body: "All pending payouts from May 17–18 have been processed. Check your payment method for the transfer confirmation.",           time: "2 hrs ago",  pinned: false },
    { id: 3, type: "Alert",  title: "Maintenance Window — May 22",   body: "The platform will be offline for scheduled maintenance from 02:00–04:00 UTC on May 22. Save your work before that window.", time: "1 day ago",  pinned: false },
  ];
  const inbox = [
    { from: "Quality Team", subject: "Your task T-2038 was approved",             time: "5 min ago",  read: false },
    { from: "Support",      subject: "Ticket #2039 has been resolved",             time: "1 hr ago",   read: false },
    { from: "Finance",      subject: "Payout of $227.50 sent via PayPal",          time: "3 hrs ago",  read: false },
    { from: "Platform",     subject: "New AI Annotation Batch is live",            time: "6 hrs ago",  read: true  },
    { from: "Quality Team", subject: "Task T-2031 feedback — please review",       time: "1 day ago",  read: true  },
    { from: "Platform",     subject: "Weekly summary: you earned $1,140",          time: "2 days ago", read: true  },
  ];
  return (
    <div className="space-y-6">
      <SectionHeader title="Notifications & Announcements" sub="Platform updates, task alerts, and your message inbox." />
      <div className="space-y-3">
        {announcements.filter(a => !dismissed.includes(a.id)).map(({ id, type, title, body, time, pinned }) => (
          <div key={id} className={`bg-white border rounded-2xl p-5 relative ${pinned ? "border-[#00d4a3]/40 shadow-sm" : "border-slate-200"}`}>
            {pinned && <span className="absolute top-3 right-12 text-[#00d4a3] text-xs font-bold">📌 Pinned</span>}
            <button onClick={() => setDismissed(p => [...p, id])} className="absolute top-3 right-4 text-slate-300 hover:text-slate-500 text-xl leading-none">×</button>
            <div className="flex items-start gap-3 pr-8">
              <span className="text-lg shrink-0">{type === "Alert" ? "⚠️" : type === "New" ? "🆕" : "📢"}</span>
              <div>
                <p className="font-bold text-[#0b1426] mb-1">{title}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                <p className="text-slate-400 text-xs mt-2">{time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">Message Inbox</h3>
          <span className="bg-[#00d4a3] text-[#0b1426] text-xs font-black px-2.5 py-1 rounded-full">3 unread</span>
        </div>
        <div className="divide-y divide-slate-100">
          {inbox.map(({ from, subject, time, read }, i) => (
            <div key={i} className={`flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition-colors cursor-pointer ${!read ? "bg-[#00d4a3]/5" : ""}`}>
              <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${!read ? "bg-[#00d4a3]" : "bg-transparent"}`} />
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!read ? "font-bold text-[#0b1426]" : "font-medium text-slate-600"}`}>{from}</p>
                <p className="text-slate-500 text-sm truncate">{subject}</p>
              </div>
              <p className="text-slate-400 text-xs shrink-0 whitespace-nowrap">{time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 9 — ANALYTICS
═══════════════════════════════════════════ */
function Analytics() {
  const monthly = [
    { month: "Dec", rev: 61 }, { month: "Jan", rev: 67 },
    { month: "Feb", rev: 72 }, { month: "Mar", rev: 78 },
    { month: "Apr", rev: 84 }, { month: "May", rev: 92 },
  ];
  return (
    <div className="space-y-6">
      <SectionHeader title="Community & Performance Analytics" sub="Platform-wide trends, worker growth, and task performance metrics." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Workers"    value="12,418" sub="+124 this week"   icon="👥" color="text-[#0b1426]" />
        <StatCard label="New Signups (7d)" value="892"    sub="+34% vs last wk"  icon="📈" color="text-[#00d4a3]" />
        <StatCard label="Tasks (Month)"    value="4,821"  sub="Completed"        icon="✅" color="text-[#f59e0b]" />
        <StatCard label="Total Paid Out"   value="$3.2M"  sub="All time"         icon="💸" color="text-[#3b82f6]" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Worker Plan Distribution</h3>
          <div className="space-y-4">
            {[
              { plan: "Free",    count: 7210, pct: 58, color: "#64748b" },
              { plan: "Basic",   count: 3820, pct: 31, color: "#00d4a3" },
              { plan: "Premium", count: 1388, pct: 11, color: "#f59e0b" },
            ].map(({ plan, count, pct, color }) => (
              <div key={plan}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-semibold text-slate-600">{plan} — {count.toLocaleString()}</span>
                  <span className="text-sm font-black text-[#0b1426]">{pct}%</span>
                </div>
                <Bar value={pct} color={color} />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Top Worker Countries</h3>
          <div className="space-y-3">
            {[
              { country: "🇰🇪 Kenya",        w: 2840, pct: 23 },
              { country: "🇵🇭 Philippines",  w: 2140, pct: 17 },
              { country: "🇮🇳 India",         w: 1920, pct: 15 },
              { country: "🇳🇬 Nigeria",       w: 1480, pct: 12 },
              { country: "🇧🇷 Brazil",        w: 980,  pct: 8  },
            ].map(({ country, w, pct }) => (
              <div key={country} className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-600 w-36">{country}</span>
                <div className="flex-1"><Bar value={pct} color="#0b1426" /></div>
                <span className="text-sm font-bold text-[#0b1426] w-12 text-right">{w.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Monthly Revenue (Last 6 Months)</h3>
        <div className="flex items-end gap-3 h-36">
          {monthly.map(({ month, rev }) => (
            <div key={month} className="flex-1 flex flex-col items-center gap-1.5">
              <p className="text-xs font-bold text-[#0b1426]">${rev}k</p>
              <div className="w-full rounded-t-lg" style={{ height: `${(rev / 92) * 120}px`, background: month === "May" ? "#00d4a3" : "#0b1426" }} />
              <p className="text-xs text-slate-400">{month}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 10 — SECURITY
═══════════════════════════════════════════ */
function Security() {
  const [twoFA, setTwoFA] = useState(true);
  const pending = [
    { name: "Michael Torres", email: "m.torres@email.com", country: "Colombia", method: "ID + Selfie", time: "2 hrs ago" },
    { name: "Fatima Al-Amin", email: "fatima.a@email.com", country: "Egypt",    method: "Passport",    time: "4 hrs ago" },
    { name: "Yuki Tanaka",    email: "yuki.t@email.com",   country: "Japan",    method: "ID + Selfie", time: "6 hrs ago" },
    { name: "Grace Ochieng",  email: "grace.o@email.com",  country: "Uganda",   method: "ID Card",     time: "8 hrs ago" },
  ];
  return (
    <div className="space-y-6">
      <SectionHeader title="Account Verification & Security" sub="Manage identity verification, 2FA, and account security." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Verified Workers"  value="11,840" sub="95.3% of total"   icon="✅" color="text-[#00d4a3]"  />
        <StatCard label="Pending Verif."   value="27"     sub="Avg wait 6 hrs"   icon="⏳" color="text-[#f59e0b]"  />
        <StatCard label="Rejected (30d)"   value="14"     sub="Fraudulent docs"  icon="❌" color="text-red-500"    />
        <StatCard label="2FA Enabled"      value="78%"    sub="Encourage rest"   icon="🔐" color="text-[#3b82f6]"  />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Your Account Security</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-xl border border-slate-100">
            <div>
              <p className="font-semibold text-[#0b1426] text-sm">Two-Factor Authentication</p>
              <p className="text-slate-400 text-xs">Protect with an authenticator app</p>
            </div>
            <button onClick={() => setTwoFA(v => !v)} className={`relative h-6 w-11 rounded-full transition-all duration-200 ${twoFA ? "bg-[#00d4a3]" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${twoFA ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
          {[
            { label: "Email Verified",          icon: "📧" },
            { label: "Identity Document",        icon: "🪪" },
            { label: "Payment Method Verified",  icon: "💳" },
            { label: "Password Strength: Strong",icon: "🔑" },
          ].map(({ label, icon }) => (
            <div key={label} className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-lg">{icon}</span>
                <span className="font-medium text-[#0b1426] text-sm">{label}</span>
              </div>
              <Badge text="Verified" color="green" />
            </div>
          ))}
          <button className="text-sm text-[#00d4a3] hover:underline font-semibold">Change Password →</button>
        </div>
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">Pending Identity Verifications</h3>
          <Badge text="27 pending" color="yellow" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead cols={["Name", "Email", "Country", "Method", "Submitted", "Actions"]} />
            <tbody>
              {pending.map((p) => (
                <tr key={p.email} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#0b1426] text-sm">{p.name}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{p.email}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{p.country}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{p.method}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs whitespace-nowrap">{p.time}</td>
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
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 11 — SUPPORT
═══════════════════════════════════════════ */
function Support() {
  const tickets = [
    { id: "#2041", user: "Carlos V.", subject: "Task rejected without explanation",         priority: "High",   status: "Open",        agent: "Sarah M.", time: "10 min ago" },
    { id: "#2040", user: "Amara K.",  subject: "Payout not received after 72 hours",       priority: "High",   status: "In Progress", agent: "James O.", time: "2 hrs ago"  },
    { id: "#2039", user: "Diego R.",  subject: "Cannot access Premium tasks after upgrade", priority: "Medium", status: "Resolved",    agent: "Lena S.",  time: "4 hrs ago"  },
    { id: "#2038", user: "Priya M.",  subject: "Training module not loading on mobile",    priority: "Low",    status: "Resolved",    agent: "James O.", time: "1 day ago"  },
    { id: "#2037", user: "Leo F.",    subject: "Account locked after password change",      priority: "High",   status: "Resolved",    agent: "Sarah M.", time: "1 day ago"  },
    { id: "#2036", user: "Yuki T.",   subject: "Verification document upload failing",      priority: "Medium", status: "Open",        agent: "—",        time: "2 days ago" },
  ];
  const pColor = (p: string): "red" | "yellow" | "green" =>
    p === "High" ? "red" : p === "Medium" ? "yellow" : "green";
  const sColor = (s: string): "red" | "yellow" | "green" =>
    s === "Open" ? "red" : s === "In Progress" ? "yellow" : "green";
  return (
    <div className="space-y-6">
      <SectionHeader title="Support Center" sub="Manage all worker support tickets and escalations." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Tickets"   value="14"  sub="3 high priority"    icon="🔴" color="text-red-500"   />
        <StatCard label="In Progress"    value="8"   sub="Assigned to agents" icon="🟡" color="text-[#f59e0b]" />
        <StatCard label="Resolved (7d)"  value="62"  sub="Avg 3.2 hr resolve" icon="🟢" color="text-[#00d4a3]" />
        <StatCard label="Satisfaction"   value="96%" sub="Positive ratings"   icon="⭐" color="text-[#3b82f6]" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-black text-[#0b1426] mb-4">Quick Ticket Response</h3>
        <div className="grid sm:grid-cols-3 gap-3 mb-3">
          <input placeholder="Ticket ID e.g. #2041" className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all" />
          <select className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#00d4a3] transition-all">
            <option>Use template…</option>
            <option>Payout Delay Response</option>
            <option>Task Rejection Explanation</option>
            <option>Account Access Help</option>
          </select>
          <button className="bg-[#0b1426] hover:bg-[#152236] text-white font-bold py-2.5 rounded-xl text-sm transition-all">Send Response</button>
        </div>
        <textarea rows={3} placeholder="Type your response here…" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all resize-none" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">All Tickets</h3>
          <button className="text-xs text-[#00d4a3] font-semibold hover:underline">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TableHead cols={["ID", "User", "Subject", "Priority", "Status", "Agent", "Time", "Action"]} />
            <tbody>
              {tickets.map((t) => (
                <tr key={t.id} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-slate-400 font-mono text-xs">{t.id}</td>
                  <td className="py-3 px-4 font-semibold text-[#0b1426] text-sm">{t.user}</td>
                  <td className="py-3 px-4 text-slate-500 text-sm max-w-xs truncate">{t.subject}</td>
                  <td className="py-3 px-4"><Badge text={t.priority} color={pColor(t.priority)} /></td>
                  <td className="py-3 px-4"><Badge text={t.status}   color={sColor(t.status)}   /></td>
                  <td className="py-3 px-4 text-slate-500 text-xs whitespace-nowrap">{t.agent}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs whitespace-nowrap">{t.time}</td>
                  <td className="py-3 px-4"><button className="text-xs text-[#00d4a3] hover:underline font-semibold">Open</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   SECTION 12 — TASK REVIEW
═══════════════════════════════════════════ */
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
  const rColor = (r: string): "red" | "yellow" | "blue" | "green" =>
    r === "High" ? "red" : r === "Medium" ? "yellow" : r === "Low" ? "blue" : "green";
 
  const decide = (id: number, val: string) => setDecisions(p => ({ ...p, [id]: val }));
 
  const selectedItem = queue.find(q => q.id === selected) ?? null;
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Task Review System" sub="QA review queue — approve, reject, or flag worker submissions." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Review"  value="12"   sub="Oldest: 4 hrs ago"  icon="⏳" color="text-[#f59e0b]" />
        <StatCard label="High Risk"       value="3"    sub="Needs urgent review" icon="🔴" color="text-red-500"   />
        <StatCard label="Approved Today"  value="48"   sub="Auto + manual"       icon="✅" color="text-[#00d4a3]" />
        <StatCard label="Rejection Rate"  value="6.2%" sub="-0.8% vs last week"  icon="📉" color="text-[#3b82f6]" />
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Queue */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-black text-[#0b1426]">Review Queue</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {queue.map((item) => (
              <div
                key={item.id}
                onClick={() => { setSelected(item.id); setNote(""); }}
                className={`px-5 py-4 cursor-pointer transition-colors ${selected === item.id ? "bg-[#00d4a3]/8 border-l-4 border-[#00d4a3]" : "hover:bg-slate-50"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-slate-400">{item.taskId}</span>
                      <Badge text={item.risk === "None" ? "Clean" : item.risk + " Risk"} color={rColor(item.risk)} />
                    </div>
                    <p className="font-semibold text-[#0b1426] text-sm">{item.worker}</p>
                    <p className="text-slate-400 text-xs">{item.project} · {item.time}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`font-black text-lg ${item.acc >= 85 ? "text-[#00d4a3]" : item.acc >= 75 ? "text-[#f59e0b]" : "text-red-500"}`}>{item.acc}%</p>
                    <p className="text-slate-400 text-xs">accuracy</p>
                  </div>
                </div>
                {item.flags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {item.flags.map(f => (
                      <span key={f} className="text-xs bg-red-50 text-red-500 border border-red-100 px-2 py-0.5 rounded-full">{f}</span>
                    ))}
                  </div>
                )}
                {decisions[item.id] && (
                  <p className={`mt-1.5 text-xs font-bold ${decisions[item.id] === "Approved" ? "text-[#00d4a3]" : decisions[item.id] === "Flagged" ? "text-[#f59e0b]" : "text-red-500"}`}>
                    → {decisions[item.id]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
 
        {/* Review panel */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          {selectedItem ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-xs text-slate-400">{selectedItem.taskId}</span>
                  <Badge text={selectedItem.risk === "None" ? "Clean" : selectedItem.risk + " Risk"} color={rColor(selectedItem.risk)} />
                </div>
                <h3 className="font-black text-[#0b1426] text-xl">{selectedItem.worker}</h3>
                <p className="text-slate-400 text-sm">{selectedItem.project} · Submitted {selectedItem.time}</p>
              </div>
              <div className="bg-[#f8fafc] rounded-2xl p-4">
                <p className="text-slate-500 text-xs mb-2 font-semibold uppercase tracking-wide">Accuracy Score</p>
                <p className={`text-5xl font-black mb-2 ${selectedItem.acc >= 85 ? "text-[#00d4a3]" : selectedItem.acc >= 75 ? "text-[#f59e0b]" : "text-red-500"}`}>
                  {selectedItem.acc}%
                </p>
                <Bar value={selectedItem.acc} color={selectedItem.acc >= 85 ? "#00d4a3" : selectedItem.acc >= 75 ? "#f59e0b" : "#ef4444"} />
                <p className="text-slate-400 text-xs mt-2">
                  {selectedItem.acc >= 85 ? "Meets quality standard" : selectedItem.acc >= 75 ? "Below standard — review flags" : "Fails quality standard"}
                </p>
              </div>
              {selectedItem.flags.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Quality Flags</p>
                  <div className="space-y-1.5">
                    {selectedItem.flags.map(f => (
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
                <textarea
                  rows={3}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder="Add feedback for the worker (optional)…"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:border-[#00d4a3] focus:ring-2 focus:ring-[#00d4a3]/20 transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(["Approved", "Flagged", "Rejected"] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => decide(selectedItem.id, d)}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${
                      decisions[selectedItem.id] === d
                        ? d === "Approved" ? "bg-[#00d4a3] text-[#0b1426]"
                          : d === "Flagged" ? "bg-[#f59e0b] text-[#0b1426]"
                          : "bg-red-500 text-white"
                        : d === "Approved" ? "bg-[#00d4a3]/10 text-[#00d4a3] hover:bg-[#00d4a3]/20"
                          : d === "Flagged" ? "bg-amber-50 text-[#f59e0b] hover:bg-amber-100"
                          : "bg-red-50 text-red-500 hover:bg-red-100"
                    }`}
                  >
                    {d === "Approved" ? "✅" : d === "Flagged" ? "🚩" : "❌"} {d}
                  </button>
                ))}
              </div>
              {decisions[selectedItem.id] && (
                <button onClick={() => setSelected(null)} className="w-full bg-[#0b1426] hover:bg-[#152236] text-white font-bold py-3 rounded-xl text-sm transition-all">
                  Submit & Next →
                </button>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-5xl mb-4">👈</div>
              <h3 className="font-black text-[#0b1426] mb-2">Select a Task</h3>
              <p className="text-slate-400 text-sm">Click any item in the queue to review it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 
/* ═══════════════════════════════════════════
   ROOT — ADMIN PAGE
═══════════════════════════════════════════ */
export default function AdminDashboard() {
  const [active,      setActive]      = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
 
  const SECTIONS: Record<Section, React.ReactNode> = {
    overview:      <Overview      />,
    projects:      <Projects      />,
    training:      <Training      />,
    earnings:      <Earnings      />,
    quality:       <Quality       />,
    management:    <Management    />,
    payments:      <Payments      />,
    notifications: <Notifications />,
    analytics:     <Analytics     />,
    security:      <Security      />,
    support:       <Support       />,
    review:        <Review        />,
  };
 
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
            <button
              key={id}
              onClick={() => { setActive(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                active === id
                  ? "bg-[#00d4a3]/15 text-[#00d4a3] border border-[#00d4a3]/20"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="text-base w-5 shrink-0 text-center">{icon}</span>
              <span className="flex-1 leading-tight">{label}</span>
              {badge && (
                <span className="text-xs bg-[#00d4a3] text-[#0b1426] font-black px-1.5 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>
 
        <div className="p-4 border-t border-white/10 flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#00d4a3]/20 flex items-center justify-center text-[#00d4a3] font-black text-xs shrink-0">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">Admin User</p>
            <p className="text-slate-500 text-xs truncate">admin@tasknest.io</p>
          </div>
          <Link href="/" className="text-slate-500 hover:text-white text-xs transition-colors">← Site</Link>
        </div>
      </aside>
 
      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20">
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
            <div className="h-8 w-8 rounded-lg bg-[#0b1426] flex items-center justify-center text-[#00d4a3] font-black text-xs">
              AD
            </div>
          </div>
        </header>
 
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {SECTIONS[active]}
        </main>
      </div>
    </div>
  );
}