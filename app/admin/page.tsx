"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type Section = "overview"|"projects"|"training"|"earnings"|"quality"|"management"|"payments"|"notifications"|"analytics"|"security"|"support"|"review";
type BC = "green"|"yellow"|"red"|"blue"|"purple"|"gray";

const NAV = [
  { id:"overview"      as Section, label:"Overview",                icon:"🏠"              },
  { id:"projects"      as Section, label:"Available Projects",      icon:"📋", badge:"6"   },
  { id:"training"      as Section, label:"Training & Quals",        icon:"🎓"              },
  { id:"earnings"      as Section, label:"Earnings Dashboard",      icon:"💰"              },
  { id:"quality"       as Section, label:"Quality & Accuracy",      icon:"🎯"              },
  { id:"management"    as Section, label:"Project Management",      icon:"🗂️"             },
  { id:"payments"      as Section, label:"Payments & Settings",     icon:"💳"              },
  { id:"notifications" as Section, label:"Notifications",           icon:"🔔", badge:"3"   },
  { id:"analytics"     as Section, label:"Community Analytics",     icon:"📊"              },
  { id:"security"      as Section, label:"Verification & Security", icon:"🔒"              },
  { id:"support"       as Section, label:"Support Center",          icon:"🛟"              },
  { id:"review"        as Section, label:"Task Review System",      icon:"✅", badge:"12"  },
];

/* ── Atoms ── */
function Badge({ text, color }: { text: string; color: BC }) {
  const m: Record<BC, string> = {
    green:  "bg-emerald-100 text-emerald-700 border-emerald-200",
    yellow: "bg-amber-100   text-amber-700   border-amber-200",
    red:    "bg-red-100     text-red-700     border-red-200",
    blue:   "bg-blue-100    text-blue-700    border-blue-200",
    purple: "bg-purple-100  text-purple-700  border-purple-200",
    gray:   "bg-slate-100   text-slate-600   border-slate-200",
  };
  return <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${m[color]}`}>{text}</span>;
}

function Bar({ v, color = "#00d4a3" }: { v: number; color?: string }) {
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(v, 100)}%`, background: color }} />
    </div>
  );
}

function TH({ cols }: { cols: string[] }) {
  return (
    <thead className="bg-[#0b1426]">
      <tr>{cols.map(c => <th key={c} className="text-left py-3 px-4 text-slate-300 text-xs font-semibold uppercase tracking-wide whitespace-nowrap">{c}</th>)}</tr>
    </thead>
  );
}

function Spin() {
  return <div className="flex justify-center py-16"><div className="h-8 w-8 border-4 border-[#00d4a3] border-t-transparent rounded-full animate-spin" /></div>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white border border-slate-200 rounded-2xl shadow-sm ${className}`}>{children}</div>;
}

function Stat({ label, value, sub, icon, color = "text-[#00d4a3]" }: { label: string; value: string; sub: string; icon: string; color?: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className={`text-3xl font-black mb-0.5 ${color}`}>{value}</p>
      <p className="text-slate-400 text-xs">{sub}</p>
    </Card>
  );
}

function SH({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-black text-[#0b1426]">{title}</h2>
      <p className="text-slate-400 text-sm mt-0.5">{sub}</p>
    </div>
  );
}

/* ════════════════════════════
   SECTION 1 — OVERVIEW
════════════════════════════ */
function Overview() {
  const [stats, setStats] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/admin/stats").then(r => r.json()).then(d => { if (d.success) setStats(d.data); }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const health = [
    { label: "Task Completion Rate", v: 91, c: "#00d4a3" },
    { label: "Worker Satisfaction",  v: 87, c: "#3b82f6" },
    { label: "On-Time Payout Rate",  v: 98, c: "#f59e0b" },
    { label: "Quality Pass Rate",    v: 94, c: "#8b5cf6" },
    { label: "Support Resolution",   v: 83, c: "#ef4444" },
  ];
  const activity = [
    { u: "Amara K.",  a: "Completed AI Annotation task",      p: "+$85.00",  t: "2m ago",  c: "#00d4a3" },
    { u: "Diego R.",  a: "Submitted Medical Image review",    p: "+$120.00", t: "14m ago", c: "#3b82f6" },
    { u: "Priya M.",  a: "Passed Intermediate qualification", p: "—",        t: "32m ago", c: "#8b5cf6" },
    { u: "Leo F.",    a: "Withdrew $340 via PayPal",           p: "-$340.00", t: "1h ago",  c: "#f59e0b" },
    { u: "Sarah N.",  a: "Raised support ticket #2041",        p: "—",        t: "2h ago",  c: "#ef4444" },
  ];

  if (loading) return <Spin />;
  return (
    <div className="space-y-6">
      <SH title="Admin Overview" sub="Platform health at a glance." />
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat label="Total Workers"   value={stats.totalWorkers?.toLocaleString() ?? "12,418"} sub="+124 this week"     icon="👥" color="text-[#0b1426]" />
        <Stat label="Active Tasks"    value={String(stats.activeTasks ?? 38)}                  sub="Currently live"     icon="📋" color="text-[#00d4a3]" />
        <Stat label="Today Payouts"   value={`$${(stats.todayPayouts ?? 0).toLocaleString()}`} sub="Paid today"         icon="💸" color="text-[#f59e0b]" />
        <Stat label="Monthly Revenue" value={`$${(stats.monthRevenue ?? 0).toLocaleString()}`} sub="This month"         icon="📈" color="text-[#3b82f6]" />
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat label="Open Tickets"         value={String(stats.openTickets ?? 14)}          sub="3 critical"         icon="🛟" color="text-red-500"    />
        <Stat label="Pending Verif."       value={String(stats.pendingVerifications ?? 27)} sub="Awaiting review"    icon="🔒" color="text-purple-500" />
        <Stat label="Platform Accuracy"    value="94.2%"                                    sub="+1.3% this week"    icon="🎯" color="text-[#00d4a3]"  />
        <Stat label="Premium Members"      value={String(stats.planBreakdown?.premium ?? 1388)} sub="11% of total"   icon="⭐" color="text-[#f59e0b]"  />
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#00d4a3] animate-pulse" />Platform Health</h3>
          <div className="space-y-4">
            {health.map(({ label, v, c }) => (
              <div key={label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-slate-600 font-medium">{label}</span>
                  <span className="text-sm font-bold text-[#0b1426]">{v}%</span>
                </div>
                <Bar v={v} color={c} />
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Recent Activity</h3>
          <div className="space-y-3">
            {activity.map(({ u, a, p, t, c }) => (
              <div key={u + t} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="h-9 w-9 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0" style={{ background: c }}>
                  {u.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#0b1426] font-semibold text-sm">{u}</p>
                  <p className="text-slate-400 text-xs truncate">{a}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className={`text-sm font-bold ${p.startsWith("+") ? "text-[#00d4a3]" : p.startsWith("-") ? "text-red-500" : "text-slate-400"}`}>{p}</p>
                  <p className="text-slate-400 text-xs">{t}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ════════════════════════════
   SECTION 2 — PROJECTS
════════════════════════════ */
function Projects() {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const staticData = [
    { _id:"1", title:"E-commerce Product Categorisation", client:"ShopGlobal Inc.", category:"Data Review",    plan:"basic",   payMin:8,  payMax:15,  totalSlots:12, filledSlots:8,  deadline:"2026-06-15", status:"active",  difficulty:"Beginner"     },
    { _id:"2", title:"Conversational AI Annotation",      client:"DeepMind Labs",   category:"AI Training",    plan:"basic",   payMin:18, payMax:35,  totalSlots:6,  filledSlots:4,  deadline:"2026-06-18", status:"active",  difficulty:"Intermediate" },
    { _id:"3", title:"Medical Image Classification",      client:"HealthAI Corp",   category:"Image Labeling", plan:"premium", payMin:40, payMax:80,  totalSlots:4,  filledSlots:1,  deadline:"2026-06-20", status:"active",  difficulty:"Advanced"     },
    { _id:"4", title:"Multilingual Content Review",       client:"TranslatePro",    category:"Content QA",     plan:"premium", payMin:25, payMax:50,  totalSlots:8,  filledSlots:3,  deadline:"2026-06-22", status:"active",  difficulty:"Intermediate" },
    { _id:"5", title:"Autonomous Driving Scene Tagging",  client:"AutoVision AI",   category:"Video Labeling", plan:"premium", payMin:60, payMax:120, totalSlots:3,  filledSlots:0,  deadline:"2026-06-25", status:"active",  difficulty:"Advanced"     },
    { _id:"6", title:"Brand Perception Survey",           client:"Insights Co.",    category:"Survey",         plan:"basic",   payMin:5,  payMax:10,  totalSlots:20, filledSlots:15, deadline:"2026-06-10", status:"closing", difficulty:"Beginner"     },
  ];
  useEffect(() => {
    const qs = filter !== "All" ? `?status=${filter}` : "";
    fetch(`/api/tasks${qs}`).then(r => r.json()).then(d => { if (d.success && d.data.length) setTasks(d.data); }).catch(() => {}).finally(() => setLoading(false));
  }, [filter]);
  const display = tasks.length > 0 ? tasks : staticData;
  return (
    <div className="space-y-6">
      <SH title="Available Projects" sub="Manage all active, draft, and closing task projects." />
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Active"  value="6" sub="Taking submissions" icon="🟢" color="text-[#00d4a3]" />
        <Stat label="Closing" value="1" sub="Slots nearly full"  icon="🟡" color="text-[#f59e0b]" />
        <Stat label="Draft"   value="1" sub="Awaiting approval"  icon="⚪" color="text-slate-400" />
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {["All","active","closing","draft","paused"].map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-full text-sm font-semibold capitalize transition-all ${filter === s ? "bg-[#0b1426] text-white" : "bg-white border border-slate-200 text-slate-500 hover:border-[#00d4a3]"}`}>{s}</button>
        ))}
        <button className="ml-auto px-4 py-2 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold rounded-full text-sm">+ New Project</button>
      </div>
      {loading ? <Spin /> : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TH cols={["Project", "Client", "Plan", "Pay", "Slots", "Deadline", "Status", "Actions"]} />
              <tbody>
                {(display as typeof staticData).map((p, i) => (
                  <tr key={p._id} className={`border-t border-slate-100 hover:bg-[#00d4a3]/5 transition-colors ${i % 2 !== 0 ? "bg-slate-50/50" : ""}`}>
                    <td className="py-3 px-4"><p className="font-semibold text-[#0b1426] text-sm">{String(p.title)}</p><p className="text-slate-400 text-xs">{String(p.category)} · {String(p.difficulty)}</p></td>
                    <td className="py-3 px-4 text-slate-500 text-xs whitespace-nowrap">{String(p.client)}</td>
                    <td className="py-3 px-4"><Badge text={String(p.plan)} color={p.plan === "premium" ? "yellow" : "blue"} /></td>
                    <td className="py-3 px-4 font-bold text-[#0b1426] whitespace-nowrap">${String(p.payMin)}–${String(p.payMax)}</td>
                    <td className="py-3 px-4 min-w-[90px]"><div className="text-xs text-slate-500 mb-1">{String(p.filledSlots)}/{String(p.totalSlots)}</div><Bar v={Math.round((Number(p.filledSlots) / Number(p.totalSlots)) * 100)} /></td>
                    <td className="py-3 px-4 text-slate-500 text-xs whitespace-nowrap">{String(p.deadline).slice(0, 10)}</td>
                    <td className="py-3 px-4"><Badge text={String(p.status)} color={p.status === "active" ? "green" : p.status === "closing" ? "yellow" : "gray"} /></td>
                    <td className="py-3 px-4"><div className="flex gap-2"><button className="text-xs text-[#00d4a3] font-semibold hover:underline">Edit</button><button className="text-xs text-red-400 font-semibold hover:underline">Pause</button></div></td>
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

/* ════════════════════════════
   SECTION 3 — TRAINING
════════════════════════════ */
function Training() {
  const [open, setOpen] = useState<number | null>(null);
  const modules = [
    { id:1, title:"Platform Orientation",         level:"Beginner",     dur:"20 min", enrolled:4821, passed:4512, req:true,  done:true  },
    { id:2, title:"Data Labeling Fundamentals",   level:"Beginner",     dur:"35 min", enrolled:3940, passed:3601, req:true,  done:true  },
    { id:3, title:"AI Annotation Best Practices", level:"Intermediate", dur:"50 min", enrolled:2140, passed:1820, req:false, done:true  },
    { id:4, title:"Image & Video Labeling",        level:"Intermediate", dur:"45 min", enrolled:1880, passed:1540, req:false, done:false },
    { id:5, title:"Medical Data Handling",         level:"Advanced",     dur:"60 min", enrolled:640,  passed:490,  req:false, done:false },
    { id:6, title:"Legal & Compliance Review",     level:"Advanced",     dur:"55 min", enrolled:310,  passed:228,  req:false, done:false },
  ];
  const lc = (l: string): BC => l === "Beginner" ? "green" : l === "Intermediate" ? "blue" : "purple";
  return (
    <div className="space-y-6">
      <SH title="Training & Qualification Center" sub="Complete modules to unlock higher-paying task categories." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Modules"   value="6"     sub="2 advanced locked"  icon="📚" color="text-[#0b1426]" />
        <Stat label="Completed" value="3/6"   sub="3 remaining"        icon="🎓" color="text-[#00d4a3]" />
        <Stat label="Avg Score" value="92.7%" sub="Above platform avg" icon="🏆" color="text-[#f59e0b]" />
        <Stat label="Level"     value="Inter" sub="Intermediate"       icon="⭐" color="text-[#3b82f6]" />
      </div>
      <div className="space-y-3">
        {modules.map(m => (
          <Card key={m.id} className={`overflow-hidden transition-all ${open === m.id ? "ring-2 ring-[#00d4a3]/40" : ""}`}>
            <div className="flex items-stretch">
              <div className={`w-1 shrink-0 ${m.done ? "bg-[#00d4a3]" : m.level === "Intermediate" ? "bg-blue-400" : m.level === "Advanced" ? "bg-purple-400" : "bg-slate-200"}`} />
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 font-black text-sm ${m.done ? "bg-[#00d4a3]/15 text-[#00d4a3]" : "bg-slate-100 text-slate-400"}`}>{m.done ? "✓" : m.id}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-bold text-[#0b1426] text-sm">{m.title}</span>
                        {m.req && <Badge text="Required" color="red" />}
                        <Badge text={m.level} color={lc(m.level)} />
                        {m.done && <Badge text="Passed" color="green" />}
                      </div>
                      <p className="text-slate-400 text-xs">{m.dur} · {m.enrolled.toLocaleString()} enrolled · {Math.round((m.passed / m.enrolled) * 100)}% pass rate</p>
                    </div>
                  </div>
                  <button onClick={() => setOpen(open === m.id ? null : m.id)} className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${m.done ? "bg-slate-100 text-slate-500" : "bg-[#0b1426] text-white hover:bg-[#152236]"}`}>
                    {m.done ? "Review" : "Start →"}
                  </button>
                </div>
                {open === m.id && (
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-slate-500 text-sm mb-4">Pass with 70%+ to unlock this task category.</p>
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      {[["Enrolled", m.enrolled.toLocaleString()], ["Pass Rate", `${Math.round((m.passed / m.enrolled) * 100)}%`], ["Avg Score", "85%"]].map(([l, v]) => (
                        <div key={l} className="bg-slate-50 rounded-xl p-3 border border-slate-100"><p className="font-black text-[#0b1426] text-xl">{v}</p><p className="text-slate-400 text-xs mt-0.5">{l}</p></div>
                      ))}
                    </div>
                    <button className="w-full bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold py-3 rounded-xl text-sm transition-all">{m.done ? "Retake Module" : "Begin Module →"}</button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════
   SECTION 4 — EARNINGS
════════════════════════════ */
function Earnings() {
  const weekly = [{ d: "Mon", v: 120 }, { d: "Tue", v: 85 }, { d: "Wed", v: 210 }, { d: "Thu", v: 95 }, { d: "Fri", v: 175 }, { d: "Sat", v: 310 }, { d: "Sun", v: 145 }];
  const max = Math.max(...weekly.map(w => w.v));
  const history = [
    { date: "May 31", task: "AI Annotation — Batch #14",  amt: 85,  status: "Paid",    method: "PayPal" },
    { date: "May 30", task: "Medical Image Review #008",  amt: 120, status: "Paid",    method: "Wise"   },
    { date: "May 30", task: "Content QA — FR/EN Set B",   amt: 47,  status: "Paid",    method: "PayPal" },
    { date: "May 29", task: "Brand Survey Batch #22",     amt: 28,  status: "Paid",    method: "Bank"   },
    { date: "May 28", task: "Driving Scene Tagging",      amt: 115, status: "Pending", method: "Wise"   },
    { date: "May 27", task: "AI Annotation — Batch #12",  amt: 92,  status: "Paid",    method: "PayPal" },
  ];
  return (
    <div className="space-y-6">
      <SH title="Earnings Dashboard" sub="Track your income, payouts, and payment history." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Today"      value="$342.50" sub="+12% yesterday"   icon="💰" color="text-[#00d4a3]" />
        <Stat label="This Week"  value="$1,140"  sub="7 tasks done"     icon="📅" color="text-[#0b1426]" />
        <Stat label="This Month" value="$4,280"  sub="Best month yet 🎉" icon="📆" color="text-[#f59e0b]" />
        <Stat label="Pending"    value="$115.00" sub="Processing 18 hrs" icon="⏳" color="text-[#3b82f6]" />
      </div>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-[#0b1426]">Weekly Earnings</h3>
          <span className="text-[#00d4a3] font-bold text-sm">$1,140 total</span>
        </div>
        <div className="flex items-end gap-3 h-40">
          {weekly.map(({ d, v }) => (
            <div key={d} className="flex-1 flex flex-col items-center gap-2">
              <p className="text-xs font-bold text-[#0b1426]">${v}</p>
              <div className="w-full rounded-t-lg" style={{ height: `${(v / max) * 120}px`, background: d === "Sat" ? "#00d4a3" : "#0b1426" }} />
              <p className="text-xs text-slate-400">{d}</p>
            </div>
          ))}
        </div>
      </Card>
      {/* Payout request */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-[#0b1426] border border-[#00d4a3]/20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white font-black text-xl mb-1">Available Balance: <span className="text-[#00d4a3]">$227.50</span></p>
            <p className="text-slate-400 text-sm">Minimum payout $10 · Premium: 24-hr processing</p>
          </div>
          <button className="shrink-0 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-lg shadow-[#00d4a3]/20">Request Payout →</button>
        </div>
      </div>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">Payment History</h3>
          <button className="text-xs text-[#00d4a3] font-semibold hover:underline">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TH cols={["Date", "Task", "Amount", "Method", "Status"]} />
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 text-slate-400 text-xs">{h.date}</td>
                  <td className="py-3 px-4 text-[#0b1426] font-medium">{h.task}</td>
                  <td className="py-3 px-4 font-black text-[#0b1426]">${h.amt}</td>
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

/* ════════════════════════════
   SECTION 5 — QUALITY
════════════════════════════ */
function Quality() {
  const workers = [
    { name: "Amara K.",  tasks: 142, acc: 98, speed: "22 min", streak: 14, tier: "Elite"    },
    { name: "Priya M.",  tasks: 118, acc: 96, speed: "28 min", streak: 9,  tier: "Elite"    },
    { name: "Diego R.",  tasks: 93,  acc: 91, speed: "35 min", streak: 5,  tier: "Pro"      },
    { name: "James O.",  tasks: 74,  acc: 88, speed: "41 min", streak: 3,  tier: "Pro"      },
    { name: "Lena S.",   tasks: 61,  acc: 84, speed: "44 min", streak: 1,  tier: "Standard" },
    { name: "Carlos V.", tasks: 32,  acc: 72, speed: "58 min", streak: 0,  tier: "Watch"    },
  ];
  const tc = (t: string): BC => t === "Elite" ? "green" : t === "Pro" ? "blue" : t === "Standard" ? "yellow" : "red";
  return (
    <div className="space-y-6">
      <SH title="Quality & Accuracy Monitoring" sub="Track worker performance and maintain quality standards." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Platform Acc." value="94.2%"  sub="+1.3% this week"     icon="🎯" color="text-[#00d4a3]" />
        <Stat label="Elite Workers" value="284"    sub="Top 2.3% performers" icon="🏆" color="text-[#f59e0b]" />
        <Stat label="Watch List"    value="38"     sub="Accuracy below 75%"  icon="⚠️" color="text-red-500"   />
        <Stat label="Avg Speed"     value="34 min" sub="-3 min from last wk" icon="⚡" color="text-[#3b82f6]" />
      </div>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Accuracy by Category</h3>
        <div className="space-y-4">
          {[["AI Annotation", 96, "#00d4a3"], ["Data Review", 93, "#3b82f6"], ["Content QA", 91, "#8b5cf6"], ["Image Labeling", 88, "#f59e0b"], ["Video Labeling", 85, "#ef4444"], ["Document Review", 79, "#ec4899"]].map(([cat, s, c]) => (
            <div key={String(cat)}>
              <div className="flex justify-between mb-1.5"><span className="text-sm text-slate-600 font-medium">{cat}</span><span className="text-sm font-black text-[#0b1426]">{s}%</span></div>
              <Bar v={Number(s)} color={String(c)} />
            </div>
          ))}
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-black text-[#0b1426]">Top Performer Leaderboard</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TH cols={["Rank", "Worker", "Tasks", "Accuracy", "Avg Speed", "Streak", "Tier"]} />
            <tbody>
              {workers.map((w, i) => (
                <tr key={w.name} className="border-t border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-black text-sm">{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i + 1}`}</td>
                  <td className="py-3 px-4 font-semibold text-[#0b1426]">{w.name}</td>
                  <td className="py-3 px-4 text-slate-600">{w.tasks}</td>
                  <td className="py-3 px-4"><div className="flex items-center gap-2"><span className="font-bold text-[#0b1426]">{w.acc}%</span><div className="w-16"><Bar v={w.acc} color={w.acc >= 90 ? "#00d4a3" : w.acc >= 80 ? "#f59e0b" : "#ef4444"} /></div></div></td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{w.speed}</td>
                  <td className="py-3 px-4 text-xs">{w.streak > 0 ? `🔥 ${w.streak}d` : "—"}</td>
                  <td className="py-3 px-4"><Badge text={w.tier} color={tc(w.tier)} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ════════════════════════════
   SECTION 6 — MANAGEMENT
════════════════════════════ */
function Management() {
  const pipeline = [{ s: "Submitted", n: 4, c: "#3b82f6" }, { s: "In Review", n: 7, c: "#f59e0b" }, { s: "Approved", n: 6, c: "#00d4a3" }, { s: "Live", n: 6, c: "#0b1426" }, { s: "Closing", n: 1, c: "#8b5cf6" }, { s: "Completed", n: 34, c: "#64748b" }];
  const queue = [
    { id: "T-2041", worker: "Amara K.",  project: "AI Annotation",   time: "9:14am",   status: "Under Review", flag: false },
    { id: "T-2042", worker: "Diego R.",  project: "Medical Imaging", time: "9:02am",   status: "Approved",     flag: false },
    { id: "T-2043", worker: "Priya M.",  project: "Content QA",      time: "8:45am",   status: "Flagged",      flag: true  },
    { id: "T-2044", worker: "Leo F.",    project: "Brand Survey",     time: "Yesterday",status: "Approved",     flag: false },
    { id: "T-2045", worker: "Carlos V.", project: "Data Review",      time: "Yesterday",status: "Rejected",     flag: true  },
  ];
  return (
    <div className="space-y-6">
      <SH title="Project Management Panel" sub="Full lifecycle control over tasks and worker submissions." />
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Project Pipeline</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {pipeline.map(({ s, n, c }) => (
            <div key={s} className="text-center p-4 bg-[#f8fafc] rounded-2xl border border-slate-100">
              <p className="text-3xl font-black mb-1" style={{ color: c }}>{n}</p>
              <p className="text-slate-400 text-xs">{s}</p>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid sm:grid-cols-3 gap-4">
        <button className="flex items-center justify-center gap-2 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold py-3 rounded-xl text-sm transition-all">➕ Create Project</button>
        <button className="flex items-center justify-center gap-2 bg-[#0b1426] hover:bg-[#152236] text-white font-bold py-3 rounded-xl text-sm transition-all">✅ Bulk Approve</button>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-[#0b1426] font-bold py-3 rounded-xl text-sm transition-all">📥 Export Report</button>
      </div>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100"><h3 className="font-black text-[#0b1426]">Submission Queue</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TH cols={["Task ID", "Worker", "Project", "Submitted", "Status", "Actions"]} />
            <tbody>
              {queue.map(t => (
                <tr key={t.id} className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${t.flag ? "bg-red-50/30" : ""}`}>
                  <td className="py-3 px-4 text-slate-400 text-xs font-mono">{t.id}</td>
                  <td className="py-3 px-4 font-semibold text-[#0b1426] text-sm">{t.worker}</td>
                  <td className="py-3 px-4 text-slate-500 text-xs">{t.project}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs">{t.time}</td>
                  <td className="py-3 px-4"><Badge text={t.status} color={t.status === "Approved" ? "green" : t.status === "Flagged" || t.status === "Rejected" ? "red" : "yellow"} /></td>
                  <td className="py-3 px-4"><div className="flex gap-2"><button className="text-xs text-[#00d4a3] font-semibold hover:underline">Review</button>{t.flag && <button className="text-xs text-red-400 font-semibold hover:underline">Escalate</button>}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ════════════════════════════
   SECTION 7 — PAYMENTS
════════════════════════════ */
const NL = ["New task available", "Task approved / rejected", "Payout processed", "Weekly earnings summary", "Platform announcements", "New training modules"];
const ND = [true, true, true, false, true, false];

function Payments() {
  const [saved, setSaved] = useState(false);
  const [tg, setTg] = useState(ND);
  const flip = useCallback((i: number) => setTg(p => p.map((v, idx) => idx === i ? !v : v)), []);
  const [payoutAmt, setPayoutAmt] = useState("");
  const [payoutMethod, setPayoutMethod] = useState("paypal");
  const [payoutMsg, setPayoutMsg] = useState("");
  const [payoutLoading, setPayoutLoading] = useState(false);

  const handlePayout = async () => {
    const amount = parseFloat(payoutAmt);
    if (!amount || amount < 10) { setPayoutMsg("❌ Minimum payout is $10"); return; }
    setPayoutLoading(true);
    setPayoutMsg("");
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workerId: "demo-worker-id", amount, method: payoutMethod }),
      });
      const data = await res.json();
      if (data.success) {
        setPayoutMsg("✅ Payout requested! Processing within 24 hours.");
        setPayoutAmt("");
      } else {
        setPayoutMsg(`❌ ${data.error}`);
      }
    } catch {
      setPayoutMsg("✅ Payout request submitted! (Demo mode — connect MongoDB to process real payments)");
      setPayoutAmt("");
    }
    setPayoutLoading(false);
  };

  return (
    <div className="space-y-6">
      <SH title="Payments & Settings" sub="Manage your payout method, plan, and account preferences." />

      {/* ── PAYOUT REQUEST FORM ── */}
      <Card className="p-6 border-2 border-[#00d4a3]/20">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-10 w-10 rounded-xl bg-[#00d4a3]/15 flex items-center justify-center text-xl">💸</div>
          <div>
            <h3 className="font-black text-[#0b1426]">Request a Payout</h3>
            <p className="text-slate-400 text-xs">Available balance: <span className="text-[#00d4a3] font-bold">$227.50</span></p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mb-3">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Amount ($)</label>
            <input type="number" min="10" max="227.50" placeholder="e.g. 50" value={payoutAmt} onChange={e => setPayoutAmt(e.target.value)}
              className="w-full border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-2.5 text-sm text-[#0b1426] focus:outline-none focus:ring-4 focus:ring-[#00d4a3]/10 transition-all" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5">Method</label>
            <select value={payoutMethod} onChange={e => setPayoutMethod(e.target.value)}
              className="w-full border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-2.5 text-sm text-[#0b1426] focus:outline-none bg-white transition-all">
              <option value="paypal">PayPal</option>
              <option value="wise">Wise</option>
              <option value="bank">Bank Transfer</option>
            </select>
          </div>
          <div className="flex items-end">
            <button onClick={handlePayout} disabled={payoutLoading}
              className="w-full bg-[#00d4a3] hover:bg-[#00c494] disabled:opacity-60 text-[#0b1426] font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-[#00d4a3]/20 flex items-center justify-center gap-2">
              {payoutLoading ? <><div className="h-4 w-4 border-2 border-[#0b1426] border-t-transparent rounded-full animate-spin" />Processing…</> : "Request Payout →"}
            </button>
          </div>
        </div>
        {payoutMsg && <p className={`text-sm font-semibold mt-2 ${payoutMsg.startsWith("✅") ? "text-[#00d4a3]" : "text-red-500"}`}>{payoutMsg}</p>}
        <p className="text-slate-400 text-xs mt-2">Premium members: payouts processed within 24 hrs · Basic: 48 hrs · Minimum: $10</p>
      </Card>

      <div className="grid sm:grid-cols-2 gap-5">
        <Card className="p-6">
          <h3 className="font-black text-[#0b1426] mb-4">Payout Methods</h3>
          <div className="space-y-3">
            {[{ m: "PayPal", a: "jane@example.com", p: true }, { m: "Wise", a: "+254 712 345 678", p: false }, { m: "Bank Transfer", a: "KE ···· 4421", p: false }].map(({ m, a, p }) => (
              <div key={m} className={`flex items-center justify-between p-3.5 rounded-xl border-2 ${p ? "border-[#00d4a3] bg-[#00d4a3]/5" : "border-slate-100 hover:border-slate-200"}`}>
                <div><p className="text-[#0b1426] font-bold text-sm">{m}</p><p className="text-slate-400 text-xs">{a}</p></div>
                {p ? <Badge text="Primary" color="green" /> : <button className="text-xs text-[#00d4a3] font-semibold hover:underline">Set Primary</button>}
              </div>
            ))}
            <button className="w-full border-2 border-dashed border-slate-200 hover:border-[#00d4a3] text-slate-400 hover:text-[#00d4a3] font-semibold py-2.5 rounded-xl text-sm transition-all">+ Add Method</button>
          </div>
        </Card>

        <div className="bg-gradient-to-b from-[#0b1426] to-[#152236] border border-[#f59e0b]/30 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3"><h3 className="font-black text-white">Current Plan</h3><Badge text="Premium" color="yellow" /></div>
          <p className="text-4xl font-black text-white mb-1">$100<span className="text-slate-400 text-base font-normal">/mo</span></p>
          <p className="text-slate-400 text-sm mb-4">Renews June 1, 2026</p>
          <div className="space-y-2 mb-5">
            {["All task categories", "Earn $300+/day", "24-hr payouts", "Priority support"].map(f => (
              <div key={f} className="flex items-center gap-2 text-slate-300 text-sm">
                <svg className="h-4 w-4 text-[#f59e0b] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>{f}
              </div>
            ))}
          </div>
          <button className="w-full border border-white/20 hover:border-white/40 text-white font-semibold py-2.5 rounded-xl text-sm transition-all">Manage Subscription</button>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Account Preferences</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[["Full Name", "Jane Doe", "text"], ["Email", "jane@example.com", "email"], ["Country", "Kenya", "text"], ["Language", "English", "text"]].map(([l, v, t]) => (
            <div key={l}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">{l}</label>
              <input type={t} defaultValue={v} className="w-full border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-2.5 text-sm text-[#0b1426] focus:outline-none focus:ring-4 focus:ring-[#00d4a3]/10 transition-all" />
            </div>
          ))}
        </div>
        <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          className={`mt-5 font-bold px-8 py-2.5 rounded-xl text-sm transition-all ${saved ? "bg-emerald-500 text-white" : "bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426]"}`}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </Card>

      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Notification Preferences</h3>
        <div className="divide-y divide-slate-100">
          {NL.map((label, i) => (
            <div key={label} className="flex items-center justify-between py-4">
              <span className="text-[#0b1426] font-medium text-sm">{label}</span>
              <button onClick={() => flip(i)} className={`relative h-6 w-11 rounded-full transition-all duration-200 ${tg[i] ? "bg-[#00d4a3]" : "bg-slate-200"}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${tg[i] ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ════════════════════════════
   SECTION 8 — NOTIFICATIONS
════════════════════════════ */
function Notifications() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const ann = [
    { id: 1, type: "New",    title: "New Premium Tasks Available",  body: "5 new advanced tasks added. Premium members get first access for 12 hours.",  time: "10 min ago", pinned: true  },
    { id: 2, type: "Update", title: "Payout Processing — May 31",   body: "All pending payouts from May 29–30 have been processed successfully.",          time: "2 hrs ago",  pinned: false },
    { id: 3, type: "Alert",  title: "Maintenance Window — June 5",  body: "Platform offline 02:00–04:00 UTC June 5 for scheduled maintenance.",             time: "1 day ago",  pinned: false },
  ];
  const inbox = [
    { from: "Quality Team", subject: "Your task T-2038 was approved",        time: "5 min ago",  read: false },
    { from: "Support",      subject: "Ticket #2039 has been resolved",        time: "1 hr ago",   read: false },
    { from: "Finance",      subject: "Payout of $227.50 sent via PayPal",     time: "3 hrs ago",  read: false },
    { from: "Platform",     subject: "New AI Annotation Batch is live",       time: "6 hrs ago",  read: true  },
    { from: "Quality Team", subject: "Task T-2031 feedback — please review",  time: "1 day ago",  read: true  },
  ];
  return (
    <div className="space-y-6">
      <SH title="Notifications & Announcements" sub="Platform updates, task alerts, and your message inbox." />
      <div className="space-y-3">
        {ann.filter(a => !dismissed.includes(a.id)).map(a => (
          <div key={a.id} className={`bg-white border rounded-2xl p-5 relative ${a.pinned ? "border-[#00d4a3]/40 shadow-sm" : "border-slate-200"}`}>
            {a.pinned && <span className="absolute top-4 right-12 text-[#00d4a3] text-xs font-bold">📌 Pinned</span>}
            <button onClick={() => setDismissed(p => [...p, a.id])} className="absolute top-4 right-4 h-7 w-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 text-sm transition-all">×</button>
            <div className="flex items-start gap-3 pr-8">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${a.type === "Alert" ? "bg-amber-100" : a.type === "New" ? "bg-[#00d4a3]/15" : "bg-blue-100"}`}>
                {a.type === "Alert" ? "⚠️" : a.type === "New" ? "🆕" : "📢"}
              </div>
              <div><p className="font-bold text-[#0b1426] mb-1">{a.title}</p><p className="text-slate-500 text-sm">{a.body}</p><p className="text-slate-400 text-xs mt-2">{a.time}</p></div>
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
            <div key={i} className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50 cursor-pointer transition-colors ${!read ? "bg-[#00d4a3]/5" : ""}`}>
              <div className={`h-2 w-2 rounded-full shrink-0 ${!read ? "bg-[#00d4a3]" : "bg-transparent"}`} />
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

/* ════════════════════════════
   SECTION 9 — ANALYTICS
════════════════════════════ */
function Analytics() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  useEffect(() => { fetch("/api/analytics").then(r => r.json()).then(d => { if (d.success) setData(d.data); }).catch(() => {}); }, []);
  const monthly = [{ m: "Dec", v: 61 }, { m: "Jan", v: 67 }, { m: "Feb", v: 72 }, { m: "Mar", v: 78 }, { m: "Apr", v: 84 }, { m: "May", v: 92 }];
  return (
    <div className="space-y-6">
      <SH title="Community & Performance Analytics" sub="Platform-wide trends, worker growth, and task performance." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Total Workers"    value={(data?.totalWorkers as number)?.toLocaleString() ?? "12,418"} sub="+124 this week"   icon="👥" color="text-[#0b1426]" />
        <Stat label="New Signups (7d)" value={String(data?.newSignups ?? 892)}                               sub="+34% vs last wk"  icon="📈" color="text-[#00d4a3]" />
        <Stat label="Tasks (Month)"    value={String(data?.tasksCompletedMonth ?? "4,821")}                  sub="Completed"        icon="✅" color="text-[#f59e0b]" />
        <Stat label="Total Paid Out"   value={`$${((data?.totalPaidOut as number) ?? 3200000).toLocaleString()}`} sub="All time"   icon="💸" color="text-[#3b82f6]" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Card className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Plan Distribution</h3>
          <div className="space-y-4">
            {[{ plan: "Free", count: 7210, pct: 58, c: "#64748b" }, { plan: "Basic", count: 3820, pct: 31, c: "#00d4a3" }, { plan: "Premium", count: 1388, pct: 11, c: "#f59e0b" }].map(({ plan, count, pct, c }) => (
              <div key={plan}><div className="flex justify-between mb-1.5"><span className="text-sm font-semibold text-slate-600">{plan} — {count.toLocaleString()}</span><span className="text-sm font-black text-[#0b1426]">{pct}%</span></div><Bar v={pct} color={c} /></div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Top Countries</h3>
          <div className="space-y-3">
            {[["🇰🇪 Kenya", 2840, 23], ["🇵🇭 Philippines", 2140, 17], ["🇮🇳 India", 1920, 15], ["🇳🇬 Nigeria", 1480, 12], ["🇧🇷 Brazil", 980, 8]].map(([c, w, p]) => (
              <div key={String(c)} className="flex items-center gap-3"><span className="text-sm font-medium text-slate-600 w-36">{c}</span><div className="flex-1"><Bar v={Number(p)} color="#0b1426" /></div><span className="text-sm font-bold text-[#0b1426] w-14 text-right">{Number(w).toLocaleString()}</span></div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Monthly Revenue</h3>
        <div className="flex items-end gap-3 h-36">
          {monthly.map(({ m, v }) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1.5">
              <p className="text-xs font-bold text-[#0b1426]">${v}k</p>
              <div className="w-full rounded-t-lg" style={{ height: `${(v / 92) * 120}px`, background: m === "May" ? "#00d4a3" : "#0b1426" }} />
              <p className="text-xs text-slate-400">{m}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ════════════════════════════
   SECTION 10 — SECURITY
════════════════════════════ */
function Security() {
  const [twoFA, setTwoFA] = useState(true);
  const pending = [
    { id: "1", name: "Michael Torres", email: "m.torres@email.com", country: "Colombia" },
    { id: "2", name: "Fatima Al-Amin", email: "fatima.a@email.com", country: "Egypt"    },
    { id: "3", name: "Yuki Tanaka",    email: "yuki.t@email.com",   country: "Japan"    },
    { id: "4", name: "Grace Ochieng",  email: "grace.o@email.com",  country: "Uganda"   },
  ];
  return (
    <div className="space-y-6">
      <SH title="Account Verification & Security" sub="Manage identity verification, 2FA, and account security." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Verified"       value="11,840" sub="95.3% of total"  icon="✅" color="text-[#00d4a3]"  />
        <Stat label="Pending"        value="27"     sub="Avg wait 6 hrs"  icon="⏳" color="text-[#f59e0b]"  />
        <Stat label="Rejected (30d)" value="14"     sub="Fraudulent docs" icon="❌" color="text-red-500"    />
        <Stat label="2FA Enabled"    value="78%"    sub="Of all accounts" icon="🔐" color="text-[#3b82f6]"  />
      </div>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-4">Account Security</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-xl border-2 border-[#00d4a3]/20">
            <div><p className="font-bold text-[#0b1426] text-sm">Two-Factor Authentication (2FA)</p><p className="text-slate-400 text-xs">Protect with an authenticator app</p></div>
            <button onClick={() => setTwoFA(v => !v)} className={`relative h-6 w-11 rounded-full transition-all duration-200 ${twoFA ? "bg-[#00d4a3]" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all duration-200 ${twoFA ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
          {[["📧", "Email Verified"], ["🪪", "Identity Document"], ["💳", "Payment Method"], ["🔑", "Password: Strong"]].map(([icon, label]) => (
            <div key={String(label)} className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-xl border border-slate-100">
              <div className="flex items-center gap-3"><span className="text-lg">{icon}</span><span className="font-medium text-[#0b1426] text-sm">{String(label)}</span></div>
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
        <div className="divide-y divide-slate-100">
          {pending.map(p => (
            <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-[#0b1426] flex items-center justify-center text-[#00d4a3] font-black text-xs shrink-0">{p.name.split(" ").map(n => n[0]).join("")}</div>
              <div className="flex-1 min-w-0"><p className="font-bold text-[#0b1426] text-sm">{p.name}</p><p className="text-slate-400 text-xs">{p.email} · {p.country}</p></div>
              <div className="flex gap-2">
                <button className="text-xs bg-[#00d4a3]/10 text-[#00d4a3] hover:bg-[#00d4a3]/20 font-bold px-3 py-1.5 rounded-lg transition-all">Approve</button>
                <button className="text-xs bg-red-50 text-red-400 hover:bg-red-100 font-bold px-3 py-1.5 rounded-lg transition-all">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ════════════════════════════
   SECTION 11 — SUPPORT
════════════════════════════ */
function Support() {
  const tickets = [
    { id: "1", name: "Carlos V.", subject: "Task rejected without explanation",          priority: "High",   status: "Open",        agent: "Sarah M." },
    { id: "2", name: "Amara K.",  subject: "Payout not received after 72 hours",        priority: "High",   status: "In Progress", agent: "James O." },
    { id: "3", name: "Diego R.",  subject: "Cannot access Premium tasks after upgrade",  priority: "Medium", status: "Resolved",    agent: "Lena S."  },
    { id: "4", name: "Priya M.",  subject: "Training module not loading on mobile",     priority: "Low",    status: "Resolved",    agent: "James O." },
    { id: "5", name: "Yuki T.",   subject: "Verification document upload failing",       priority: "Medium", status: "Open",        agent: "—"        },
  ];
  const pc = (p: string): BC => p === "High" ? "red" : p === "Medium" ? "yellow" : "green";
  const sc = (s: string): BC => s === "Open" ? "red" : s === "In Progress" ? "yellow" : "green";
  return (
    <div className="space-y-6">
      <SH title="Support Center" sub="Manage all worker support tickets and escalations." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Open Tickets"  value="14"  sub="3 high priority"    icon="🔴" color="text-red-500"   />
        <Stat label="In Progress"   value="8"   sub="Assigned to agents" icon="🟡" color="text-[#f59e0b]" />
        <Stat label="Resolved (7d)" value="62"  sub="Avg 3.2 hr resolve" icon="🟢" color="text-[#00d4a3]" />
        <Stat label="Satisfaction"  value="96%" sub="Positive ratings"   icon="⭐" color="text-[#3b82f6]" />
      </div>
      <Card className="p-6">
        <h3 className="font-black text-[#0b1426] mb-4">Quick Response</h3>
        <div className="grid sm:grid-cols-3 gap-3 mb-3">
          <input placeholder="Ticket ID e.g. #2041" className="border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-2.5 text-sm focus:outline-none transition-all" />
          <select className="border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none transition-all">
            <option>Use template…</option>
            <option>Payout Delay Response</option>
            <option>Task Rejection Explanation</option>
            <option>Account Access Help</option>
          </select>
          <button className="bg-[#0b1426] hover:bg-[#152236] text-white font-bold py-2.5 rounded-xl text-sm transition-all">Send Response</button>
        </div>
        <textarea rows={3} placeholder="Type your response here…" className="w-full border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-3 text-sm placeholder-slate-400 focus:outline-none transition-all resize-none" />
      </Card>
      <Card className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">All Tickets</h3>
          <button className="text-xs text-[#00d4a3] font-semibold hover:underline">Export CSV</button>
        </div>
        <div className="divide-y divide-slate-100">
          {tickets.map(t => (
            <div key={t.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
              <div className="h-9 w-9 rounded-xl bg-[#0b1426] flex items-center justify-center text-[#00d4a3] font-black text-xs shrink-0">{t.name.split(" ").map(n => n[0]).join("")}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-bold text-[#0b1426] text-sm">{t.name}</p>
                  <Badge text={t.priority} color={pc(t.priority)} />
                  <Badge text={t.status} color={sc(t.status)} />
                </div>
                <p className="text-slate-500 text-xs truncate">{t.subject}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-slate-400 text-xs mb-1">{t.agent}</p>
                <button className="text-xs bg-[#00d4a3]/10 text-[#00d4a3] font-semibold px-3 py-1 rounded-lg hover:bg-[#00d4a3]/20 transition-all">Open</button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ════════════════════════════
   SECTION 12 — REVIEW
════════════════════════════ */
function Review() {
  const [sel,  setSel]  = useState<number | null>(null);
  const [dec,  setDec]  = useState<Record<number, string>>({});
  const [note, setNote] = useState("");
  const queue = [
    { id: 1, taskId: "T-2041", worker: "Carlos V.", project: "Data Review",    time: "9:14am", acc: 71, flags: ["Inconsistent labels", "3 blank fields"], risk: "High"   },
    { id: 2, taskId: "T-2043", worker: "Priya M.",  project: "Content QA",     time: "8:45am", acc: 88, flags: ["Minor phrasing issue"],                  risk: "Low"    },
    { id: 3, taskId: "T-2050", worker: "James O.",  project: "Image Labeling", time: "8:12am", acc: 65, flags: ["Missing boxes", "Wrong class"],           risk: "High"   },
    { id: 4, taskId: "T-2051", worker: "Lena S.",   project: "AI Annotation",  time: "7:55am", acc: 92, flags: [],                                          risk: "None"   },
    { id: 5, taskId: "T-2052", worker: "Michael T.",project: "Video Labeling", time: "7:30am", acc: 78, flags: ["Timestamp drift"],                         risk: "Medium" },
  ];
  const rc = (r: string): BC => r === "High" ? "red" : r === "Medium" ? "yellow" : r === "Low" ? "blue" : "green";
  const item = queue.find(q => q.id === sel) ?? null;
  return (
    <div className="space-y-6">
      <SH title="Task Review System" sub="QA queue — approve, flag, or reject worker submissions." />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Pending Review" value="12"   sub="Oldest: 4 hrs ago"  icon="⏳" color="text-[#f59e0b]" />
        <Stat label="High Risk"      value="3"    sub="Needs urgent review" icon="🔴" color="text-red-500"   />
        <Stat label="Approved Today" value="48"   sub="Auto + manual"       icon="✅" color="text-[#00d4a3]" />
        <Stat label="Rejection Rate" value="6.2%" sub="-0.8% vs last week"  icon="📉" color="text-[#3b82f6]" />
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100"><h3 className="font-black text-[#0b1426]">Review Queue</h3></div>
          <div className="divide-y divide-slate-100">
            {queue.map(q => (
              <div key={q.id} onClick={() => { setSel(q.id); setNote(""); }}
                className={`px-5 py-4 cursor-pointer transition-all ${sel === q.id ? "bg-[#00d4a3]/8 border-l-4 border-[#00d4a3]" : "hover:bg-slate-50 border-l-4 border-transparent"}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{q.taskId}</span>
                      <Badge text={q.risk === "None" ? "Clean" : q.risk + " Risk"} color={rc(q.risk)} />
                    </div>
                    <p className="font-bold text-[#0b1426] text-sm">{q.worker}</p>
                    <p className="text-slate-400 text-xs">{q.project} · {q.time}</p>
                    {q.flags.length > 0 && <div className="mt-1.5 flex flex-wrap gap-1">{q.flags.map(f => <span key={f} className="text-xs bg-red-50 text-red-500 border border-red-100 px-2 py-0.5 rounded-full">{f}</span>)}</div>}
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`font-black text-xl ${q.acc >= 85 ? "text-[#00d4a3]" : q.acc >= 75 ? "text-[#f59e0b]" : "text-red-500"}`}>{q.acc}%</p>
                    {dec[q.id] && <p className={`text-xs font-bold mt-0.5 ${dec[q.id] === "Approved" ? "text-[#00d4a3]" : dec[q.id] === "Flagged" ? "text-[#f59e0b]" : "text-red-500"}`}>→ {dec[q.id]}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          {item ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2"><span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">{item.taskId}</span><Badge text={item.risk === "None" ? "Clean" : item.risk + " Risk"} color={rc(item.risk)} /></div>
                <h3 className="font-black text-[#0b1426] text-xl">{item.worker}</h3>
                <p className="text-slate-400 text-sm">{item.project} · {item.time}</p>
              </div>
              <div className={`rounded-2xl p-4 ${item.acc >= 85 ? "bg-[#00d4a3]/10 border border-[#00d4a3]/20" : item.acc >= 75 ? "bg-amber-50 border border-amber-200" : "bg-red-50 border border-red-200"}`}>
                <p className="text-slate-500 text-xs mb-2 font-semibold uppercase tracking-wide">Accuracy Score</p>
                <p className={`text-5xl font-black mb-2 ${item.acc >= 85 ? "text-[#00d4a3]" : item.acc >= 75 ? "text-[#f59e0b]" : "text-red-500"}`}>{item.acc}%</p>
                <div className="h-3 bg-white/60 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${item.acc}%`, background: item.acc >= 85 ? "#00d4a3" : item.acc >= 75 ? "#f59e0b" : "#ef4444" }} /></div>
                <p className="text-slate-500 text-xs mt-2">{item.acc >= 85 ? "✓ Meets quality standard" : item.acc >= 75 ? "⚠️ Below standard — review flags" : "✗ Fails quality standard"}</p>
              </div>
              {item.flags.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Quality Flags</p>
                  <div className="space-y-2">{item.flags.map(f => <div key={f} className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5"><span className="text-base">⚠️</span><span className="text-red-600 text-sm font-medium">{f}</span></div>)}</div>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Reviewer Note</p>
                <textarea rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Add feedback (optional)…"
                  className="w-full border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-2.5 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none transition-all resize-none" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {(["Approved", "Flagged", "Rejected"] as const).map(d => (
                  <button key={d} onClick={() => setDec(p => ({ ...p, [item.id]: d }))}
                    className={`py-3 rounded-xl text-sm font-bold transition-all ${dec[item.id] === d
                      ? d === "Approved" ? "bg-[#00d4a3] text-[#0b1426]" : d === "Flagged" ? "bg-[#f59e0b] text-[#0b1426]" : "bg-red-500 text-white"
                      : d === "Approved" ? "bg-[#00d4a3]/10 text-[#00d4a3] hover:bg-[#00d4a3]/20 border-2 border-[#00d4a3]/20"
                        : d === "Flagged" ? "bg-amber-50 text-amber-600 hover:bg-amber-100 border-2 border-amber-200"
                        : "bg-red-50 text-red-500 hover:bg-red-100 border-2 border-red-200"}`}>
                    {d === "Approved" ? "✅" : d === "Flagged" ? "🚩" : "❌"} {d}
                  </button>
                ))}
              </div>
              {dec[item.id] && <button onClick={() => setSel(null)} className="w-full bg-[#0b1426] hover:bg-[#152236] text-white font-bold py-3 rounded-xl text-sm transition-all">Submit & Next →</button>}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="text-5xl mb-4">👈</div>
              <h3 className="font-black text-[#0b1426] mb-2">Select a Task</h3>
              <p className="text-slate-400 text-sm">Click any item in the queue to review it here.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

/* ════════════════════════════
   RENDER SWITCH
════════════════════════════ */
function renderSection(s: Section) {
  switch (s) {
    case "overview":      return <Overview />;
    case "projects":      return <Projects />;
    case "training":      return <Training />;
    case "earnings":      return <Earnings />;
    case "quality":       return <Quality />;
    case "management":    return <Management />;
    case "payments":      return <Payments />;
    case "notifications": return <Notifications />;
    case "analytics":     return <Analytics />;
    case "security":      return <Security />;
    case "support":       return <Support />;
    case "review":        return <Review />;
  }
}

/* ════════════════════════════
   ROOT
════════════════════════════ */
export default function AdminDashboard() {
  const [active, setActive] = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const label = NAV.find(n => n.id === active)?.label ?? "";

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── SIDEBAR ── */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#0b1426] flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00d4a3] text-[#0b1426] font-black text-sm">TN</span>
            <span className="text-white font-bold text-lg">Task<span className="text-[#00d4a3]">Nest</span></span>
          </Link>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#00d4a3] animate-pulse" />
            <span className="text-[#00d4a3] text-xs font-bold">Admin Portal</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV.map(({ id, label, icon, badge }) => (
            <button key={id} onClick={() => { setActive(id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${active === id ? "bg-[#00d4a3]/15 text-[#00d4a3] border border-[#00d4a3]/20" : "text-slate-400 hover:text-white hover:bg-white/5"}`}>
              <span className="text-base w-5 text-center shrink-0">{icon}</span>
              <span className="flex-1 leading-tight">{label}</span>
              {badge && <span className={`text-xs font-black px-1.5 py-0.5 rounded-full ${active === id ? "bg-[#00d4a3] text-[#0b1426]" : "bg-white/20 text-white"}`}>{badge}</span>}
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

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <div>
              <h1 className="text-lg font-black text-[#0b1426] leading-tight">{label}</h1>
              <p className="text-slate-400 text-xs hidden sm:block">{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setActive("notifications")} className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
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