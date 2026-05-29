"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
 
/* ════════════════════════════════════════
   TYPES
════════════════════════════════════════ */
type Section =
  | "overview" | "projects" | "training" | "earnings"
  | "quality"  | "management" | "payments" | "notifications"
  | "analytics"| "security"  | "support"  | "review";
 
type BC = "green"|"yellow"|"red"|"blue"|"purple"|"gray"|"teal";
 
/* ════════════════════════════════════════
   NAVIGATION
════════════════════════════════════════ */
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
 
/* ════════════════════════════════════════
   REAL WORKER PHOTOS (Unsplash)
   next.config.ts already allows images.unsplash.com
════════════════════════════════════════ */
const WORKER_PHOTOS = [
  { name:"Amara K.",   photo:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face", tier:"Elite",    acc:98, tasks:142, country:"Kenya"      },
  { name:"Priya M.",   photo:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face", tier:"Elite",    acc:96, tasks:118, country:"India"      },
  { name:"Diego R.",   photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face", tier:"Pro",      acc:91, tasks:93,  country:"Philippines"},
  { name:"James O.",   photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face", tier:"Pro",      acc:88, tasks:74,  country:"Nigeria"    },
  { name:"Lena S.",    photo:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face", tier:"Standard", acc:84, tasks:61,  country:"Germany"    },
  { name:"Carlos V.",  photo:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face", tier:"Watch",    acc:72, tasks:32,  country:"Brazil"     },
];
 
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=280&fit=crop",
];
 
/* ════════════════════════════════════════
   SHARED ATOMS
════════════════════════════════════════ */
function Chip({ text, color }: { text:string; color:BC }) {
  const m: Record<BC,string> = {
    green:  "bg-emerald-50 text-emerald-700 border-emerald-200",
    yellow: "bg-amber-50   text-amber-700   border-amber-200",
    red:    "bg-red-50     text-red-600     border-red-200",
    blue:   "bg-blue-50    text-blue-700    border-blue-200",
    purple: "bg-purple-50  text-purple-700  border-purple-200",
    gray:   "bg-slate-100  text-slate-500   border-slate-200",
    teal:   "bg-teal-50    text-teal-700    border-teal-200",
  };
  return <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${m[color]}`}>{text}</span>;
}
 
function Bar({ v, color="#00d4a3", height="h-2" }: { v:number; color?:string; height?:string }) {
  return (
    <div className={`${height} bg-slate-100 rounded-full overflow-hidden`}>
      <div className={`h-full rounded-full transition-all duration-700`} style={{ width:`${Math.min(v,100)}%`, background:color }}/>
    </div>
  );
}
 
function TH({ cols }: { cols:string[] }) {
  return (
    <thead>
      <tr className="bg-gradient-to-r from-[#0b1426] to-[#1a2a45]">
        {cols.map(c=>(
          <th key={c} className="text-left py-3.5 px-4 text-slate-300 text-xs font-semibold uppercase tracking-wider whitespace-nowrap first:rounded-tl-xl last:rounded-tr-xl">{c}</th>
        ))}
      </tr>
    </thead>
  );
}
 
function Spinner() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-slate-100"/>
        <div className="absolute inset-0 rounded-full border-4 border-t-[#00d4a3] animate-spin"/>
      </div>
    </div>
  );
}
 
function GlassCard({ children, className="" }: { children:React.ReactNode; className?:string }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm ${className}`}>
      {children}
    </div>
  );
}
 
function StatCard({ label, value, sub, gradient, icon, trend }: {
  label:string; value:string; sub:string; gradient:string; icon:string; trend?:string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 text-white ${gradient} shadow-lg`}>
      <div className="absolute -top-4 -right-4 text-6xl opacity-10 select-none">{icon}</div>
      <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">{label}</p>
      <p className="text-3xl font-black mb-1">{value}</p>
      <div className="flex items-center gap-1.5">
        {trend && <span className="text-white/60 text-xs">{trend}</span>}
        <span className="text-white/60 text-xs">{sub}</span>
      </div>
    </div>
  );
}
 
function SectionHeader({ title, sub, icon }: { title:string; sub:string; icon:string }) {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#00d4a3] to-[#0b8c6f] flex items-center justify-center text-2xl shadow-lg shadow-[#00d4a3]/30 shrink-0">
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-black text-[#0b1426] leading-tight">{title}</h2>
        <p className="text-slate-400 text-sm mt-0.5">{sub}</p>
      </div>
    </div>
  );
}
 
/* ════════════════════════════════════════
   WORKER AVATAR with real photo
════════════════════════════════════════ */
function WorkerAvatar({ photo, name, size="h-9 w-9" }: { photo:string; name:string; size?:string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className={`${size} rounded-xl bg-gradient-to-br from-[#0b1426] to-[#1a2a45] flex items-center justify-center text-[#00d4a3] font-black text-xs shrink-0`}>
        {name.split(" ").map(n=>n[0]).join("").slice(0,2)}
      </div>
    );
  }
  return (
    <div className={`${size} rounded-xl overflow-hidden shrink-0 ring-2 ring-white shadow-md`}>
      <Image src={photo} alt={name} width={80} height={80} className="object-cover w-full h-full" onError={()=>setErr(true)}/>
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 1 — OVERVIEW
════════════════════════════════════════ */
function Overview() {
  const [stats, setStats] = useState<Record<string,number>>({});
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetch("/api/admin/stats")
      .then(r=>r.json()).then(d=>{ if(d.success) setStats(d.data); })
      .catch(()=>{}).finally(()=>setLoading(false));
  }, []);
 
  const health = [
    { label:"Task Completion Rate", v:91, color:"#00d4a3" },
    { label:"Worker Satisfaction",  v:87, color:"#3b82f6" },
    { label:"On-Time Payout Rate",  v:98, color:"#f59e0b" },
    { label:"Quality Pass Rate",    v:94, color:"#8b5cf6" },
    { label:"Support Resolution",   v:83, color:"#ef4444" },
  ];
 
  if (loading) return <Spinner/>;
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Admin Overview" icon="🏠" sub="Platform health at a glance — live from MongoDB."/>
 
      {/* Hero banner with working photo */}
      <div className="relative rounded-3xl overflow-hidden h-48 bg-gradient-to-r from-[#0b1426] via-[#152236] to-[#0b1426]">
        <div className="absolute inset-0 grid grid-cols-3 gap-0 opacity-30">
          {HERO_IMAGES.map((src,i)=>(
            <div key={i} className="relative overflow-hidden">
              <Image src={src} alt="workers" fill className="object-cover" sizes="33vw"/>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1426]/90 via-[#0b1426]/60 to-transparent"/>
        <div className="relative z-10 p-8 flex items-center justify-between h-full">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="h-2 w-2 rounded-full bg-[#00d4a3] animate-pulse"/>
              <span className="text-[#00d4a3] text-xs font-bold uppercase tracking-widest">Live Platform Status</span>
            </div>
            <h3 className="text-white text-3xl font-black">TaskNest Admin</h3>
            <p className="text-slate-400 text-sm mt-1">
              {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
            </p>
          </div>
          <div className="hidden sm:flex gap-6 text-center">
            <div><p className="text-3xl font-black text-[#00d4a3]">{stats.totalWorkers?.toLocaleString()??"12,418"}</p><p className="text-slate-400 text-xs mt-0.5">Workers</p></div>
            <div className="w-px bg-white/10"/>
            <div><p className="text-3xl font-black text-[#f59e0b]">${(stats.todayPayouts??0).toLocaleString()}</p><p className="text-slate-400 text-xs mt-0.5">Paid Today</p></div>
            <div className="w-px bg-white/10"/>
            <div><p className="text-3xl font-black text-white">{stats.activeTasks??38}</p><p className="text-slate-400 text-xs mt-0.5">Active Tasks</p></div>
          </div>
        </div>
      </div>
 
      {/* Stat cards with gradients */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Workers"   value={stats.totalWorkers?.toLocaleString()??"12,418"} sub="registered"      gradient="bg-gradient-to-br from-[#0b1426] to-[#1e3a5f]" icon="👥" trend="↑ +124 this week"/>
        <StatCard label="Active Tasks"    value={String(stats.activeTasks??38)}                   sub="currently live"  gradient="bg-gradient-to-br from-[#00b894] to-[#00d4a3]" icon="📋" trend="↑ 6 pending"/>
        <StatCard label="Today's Payouts" value={`$${(stats.todayPayouts??8240).toLocaleString()}`} sub="processed"    gradient="bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]" icon="💸" trend="↑ 142 txns"/>
        <StatCard label="Monthly Revenue" value={`$${(stats.monthRevenue??92000).toLocaleString()}`} sub="this month"  gradient="bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa]" icon="📈" trend="↑ +18%"/>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Open Tickets"     value={String(stats.openTickets??14)}          sub="3 critical"      gradient="bg-gradient-to-br from-[#ef4444] to-[#f87171]" icon="🛟" trend="⚠️ urgent"/>
        <StatCard label="Pending Verif."   value={String(stats.pendingVerifications??27)} sub="awaiting review" gradient="bg-gradient-to-br from-[#6366f1] to-[#818cf8]" icon="🔒" trend="avg 6 hrs"/>
        <StatCard label="Platform Acc."    value="94.2%"                                  sub="quality score"   gradient="bg-gradient-to-br from-[#0ea5e9] to-[#38bdf8]" icon="🎯" trend="↑ +1.3%"/>
        <StatCard label="Premium Members"  value={String(stats.planBreakdown?.premium??1388)} sub="active plans"  gradient="bg-gradient-to-br from-[#d97706] to-[#f59e0b]" icon="⭐" trend="11% of total"/>
      </div>
 
      {/* Health + Activity row */}
      <div className="grid lg:grid-cols-2 gap-5">
        <GlassCard className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#00d4a3] animate-pulse"/>
            Platform Health
          </h3>
          <div className="space-y-5">
            {health.map(({label,v,color})=>(
              <div key={label}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600 font-medium">{label}</span>
                  <span className="text-sm font-black text-[#0b1426] bg-slate-100 px-2 py-0.5 rounded-lg">{v}%</span>
                </div>
                <Bar v={v} color={color} height="h-3"/>
              </div>
            ))}
          </div>
        </GlassCard>
 
        <GlassCard className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Recent Activity</h3>
          <div className="space-y-4">
            {WORKER_PHOTOS.slice(0,5).map(({name,photo},idx)=>{
              const acts=[
                {a:"Completed AI Annotation task",     p:"+$85.00",  t:"2m ago",  pc:true },
                {a:"Submitted Medical Image review",   p:"+$120.00", t:"14m ago", pc:true },
                {a:"Passed Intermediate qualification", p:"—",        t:"32m ago", pc:false},
                {a:"Withdrew $340 via PayPal",          p:"-$340.00", t:"1h ago",  pc:false},
                {a:"Raised support ticket #2041",       p:"—",        t:"2h ago",  pc:false},
              ];
              const act = acts[idx];
              return (
                <div key={name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <WorkerAvatar photo={photo} name={name}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#0b1426] font-semibold text-sm">{name}</p>
                    <p className="text-slate-400 text-xs truncate">{act.a}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold ${act.p.startsWith("+")?"text-[#00d4a3]":act.p.startsWith("-")?"text-red-500":"text-slate-400"}`}>{act.p}</p>
                    <p className="text-slate-400 text-xs">{act.t}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 2 — PROJECTS
════════════════════════════════════════ */
function Projects() {
  const [filter, setFilter] = useState("All");
  const [tasks,  setTasks]  = useState<Record<string,unknown>[]>([]);
  const [loading, setLoading] = useState(true);
 
  const staticData = [
    { _id:"1", title:"E-commerce Product Categorisation", client:"ShopGlobal Inc.",  category:"Data Review",    plan:"basic",   payMin:8,  payMax:15,  totalSlots:12, filledSlots:8,  deadline:"2026-05-23", status:"active",  difficulty:"Beginner"     },
    { _id:"2", title:"Conversational AI Annotation",      client:"DeepMind Labs",    category:"AI Training",    plan:"basic",   payMin:18, payMax:35,  totalSlots:6,  filledSlots:4,  deadline:"2026-05-25", status:"active",  difficulty:"Intermediate" },
    { _id:"3", title:"Medical Image Classification",      client:"HealthAI Corp",    category:"Image Labeling", plan:"premium", payMin:40, payMax:80,  totalSlots:4,  filledSlots:1,  deadline:"2026-05-28", status:"active",  difficulty:"Advanced"     },
    { _id:"4", title:"Multilingual Content Review",       client:"TranslatePro",     category:"Content QA",     plan:"premium", payMin:25, payMax:50,  totalSlots:8,  filledSlots:3,  deadline:"2026-05-30", status:"active",  difficulty:"Intermediate" },
    { _id:"5", title:"Autonomous Driving Scene Tagging",  client:"AutoVision AI",    category:"Video Labeling", plan:"premium", payMin:60, payMax:120, totalSlots:3,  filledSlots:0,  deadline:"2026-06-02", status:"active",  difficulty:"Advanced"     },
    { _id:"6", title:"Brand Perception Survey",           client:"Insights Co.",     category:"Survey",         plan:"basic",   payMin:5,  payMax:10,  totalSlots:20, filledSlots:15, deadline:"2026-05-22", status:"closing", difficulty:"Beginner"     },
  ];
 
  useEffect(() => {
    const qs = filter !== "All" ? `?status=${filter}` : "";
    fetch(`/api/tasks${qs}`).then(r=>r.json()).then(d=>{ if(d.success) setTasks(d.data); }).catch(()=>{}).finally(()=>setLoading(false));
  }, [filter]);
 
  const display = tasks.length > 0 ? tasks : staticData;
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Available Projects" icon="📋" sub="Manage all active, draft, and closing task projects."/>
      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Active"  value="6" sub="Taking submissions" gradient="bg-gradient-to-br from-[#00b894] to-[#00d4a3]" icon="🟢"/>
        <StatCard label="Closing" value="1" sub="Slots nearly full"  gradient="bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]" icon="🟡"/>
        <StatCard label="Draft"   value="1" sub="Awaiting approval"  gradient="bg-gradient-to-br from-[#64748b] to-[#94a3b8]" icon="⚪"/>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        {["All","active","closing","draft","paused"].map(s=>(
          <button key={s} onClick={()=>setFilter(s)}
            className={`px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${filter===s?"bg-[#0b1426] text-white shadow-lg":"bg-white border border-slate-200 text-slate-500 hover:border-[#00d4a3] hover:text-[#00d4a3]"}`}>
            {s}
          </button>
        ))}
        <button className="ml-auto px-5 py-2 bg-gradient-to-r from-[#00d4a3] to-[#00b894] hover:opacity-90 text-[#0b1426] font-bold rounded-full text-sm transition-all shadow-lg shadow-[#00d4a3]/25">
          + New Project
        </button>
      </div>
      {loading ? <Spinner/> : (
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <TH cols={["Project","Client","Plan","Pay","Slots","Deadline","Status","Actions"]}/>
              <tbody>
                {(display as typeof staticData).map((p,i)=>(
                  <tr key={p._id} className={`border-t border-slate-100 hover:bg-gradient-to-r hover:from-[#00d4a3]/5 hover:to-transparent transition-all ${i%2!==0?"bg-slate-50/50":""}`}>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-[#0b1426] text-sm">{String(p.title)}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{String(p.category)} · <span className={`font-medium ${String(p.difficulty)==="Advanced"?"text-purple-500":String(p.difficulty)==="Intermediate"?"text-blue-500":"text-emerald-500"}`}>{String(p.difficulty)}</span></p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs">{String(p.client)}</td>
                    <td className="py-3.5 px-4"><Chip text={String(p.plan)} color={p.plan==="premium"?"yellow":"blue"}/></td>
                    <td className="py-3.5 px-4 font-black text-[#0b1426] whitespace-nowrap">${String(p.payMin)}–${String(p.payMax)}</td>
                    <td className="py-3.5 px-4 min-w-[110px]">
                      <div className="flex items-center gap-2">
                        <div className="flex-1"><Bar v={Math.round((Number(p.filledSlots)/Number(p.totalSlots))*100)} color="#00d4a3" height="h-1.5"/></div>
                        <span className="text-xs text-slate-500 whitespace-nowrap">{String(p.filledSlots)}/{String(p.totalSlots)}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs whitespace-nowrap">{String(p.deadline).slice(0,10)}</td>
                    <td className="py-3.5 px-4"><Chip text={String(p.status)} color={p.status==="active"?"green":p.status==="closing"?"yellow":"gray"}/></td>
                    <td className="py-3.5 px-4">
                      <div className="flex gap-2">
                        <button className="text-xs bg-[#00d4a3]/10 text-[#00d4a3] hover:bg-[#00d4a3]/20 font-semibold px-3 py-1 rounded-lg transition-all">Edit</button>
                        <button className="text-xs bg-red-50 text-red-400 hover:bg-red-100 font-semibold px-3 py-1 rounded-lg transition-all">Pause</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 3 — TRAINING
════════════════════════════════════════ */
function Training() {
  const [open, setOpen] = useState<number|null>(null);
  const modules = [
    { id:1, title:"Platform Orientation",         level:"Beginner",     dur:"20 min", enrolled:4821, passed:4512, req:true,  done:true,  color:"from-emerald-400 to-green-500"   },
    { id:2, title:"Data Labeling Fundamentals",   level:"Beginner",     dur:"35 min", enrolled:3940, passed:3601, req:true,  done:true,  color:"from-blue-400 to-cyan-500"       },
    { id:3, title:"AI Annotation Best Practices", level:"Intermediate", dur:"50 min", enrolled:2140, passed:1820, req:false, done:true,  color:"from-violet-400 to-purple-500"   },
    { id:4, title:"Image & Video Labeling",        level:"Intermediate", dur:"45 min", enrolled:1880, passed:1540, req:false, done:false, color:"from-orange-400 to-amber-500"    },
    { id:5, title:"Medical Data Handling",         level:"Advanced",     dur:"60 min", enrolled:640,  passed:490,  req:false, done:false, color:"from-pink-400 to-rose-500"       },
    { id:6, title:"Legal & Compliance Review",     level:"Advanced",     dur:"55 min", enrolled:310,  passed:228,  req:false, done:false, color:"from-slate-400 to-gray-500"      },
  ];
  const lc = (l:string): BC => l==="Beginner"?"green":l==="Intermediate"?"blue":"purple";
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Training & Qualification Center" icon="🎓" sub="Complete modules to unlock higher-paying task categories."/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Modules"     value="6"     sub="available"          gradient="bg-gradient-to-br from-[#0b1426] to-[#1e3a5f]" icon="📚"/>
        <StatCard label="Completed"   value="3/6"   sub="3 remaining"        gradient="bg-gradient-to-br from-[#00b894] to-[#00d4a3]" icon="🎓"/>
        <StatCard label="Avg Score"   value="92.7%" sub="above platform avg" gradient="bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]" icon="🏆"/>
        <StatCard label="Your Level"  value="Inter" sub="Intermediate"       gradient="bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa]" icon="⭐"/>
      </div>
      <div className="space-y-3">
        {modules.map(m=>(
          <GlassCard key={m.id} className={`overflow-hidden transition-all ${open===m.id?"ring-2 ring-[#00d4a3]/40 shadow-lg shadow-[#00d4a3]/10":""}`}>
            <div className="flex items-stretch">
              {/* Color bar */}
              <div className={`w-1.5 bg-gradient-to-b ${m.color} shrink-0`}/>
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 font-black text-sm text-white bg-gradient-to-br ${m.done?m.color:"from-slate-200 to-slate-300"} shadow-md`}>
                      {m.done?"✓":m.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className="font-bold text-[#0b1426] text-sm">{m.title}</span>
                        {m.req&&<Chip text="Required" color="red"/>}
                        <Chip text={m.level} color={lc(m.level)}/>
                        {m.done&&<Chip text="Passed" color="green"/>}
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-slate-400 text-xs">{m.dur}</p>
                        <span className="text-slate-300">·</span>
                        <p className="text-slate-400 text-xs">{m.enrolled.toLocaleString()} enrolled</p>
                        <span className="text-slate-300">·</span>
                        <p className="text-slate-400 text-xs">{Math.round((m.passed/m.enrolled)*100)}% pass rate</p>
                      </div>
                    </div>
                  </div>
                  <button onClick={()=>setOpen(open===m.id?null:m.id)}
                    className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${m.done?"bg-slate-100 text-slate-500 hover:bg-slate-200":`bg-gradient-to-r ${m.color} text-white shadow-md hover:opacity-90`}`}>
                    {m.done?"Review":"Start →"}
                  </button>
                </div>
                {open===m.id&&(
                  <div className="mt-5 pt-5 border-t border-slate-100">
                    <p className="text-slate-500 text-sm mb-4">Pass with 70%+ to unlock this task category. All questions are multiple choice.</p>
                    <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                      {[["Enrolled",m.enrolled.toLocaleString()],["Pass Rate",`${Math.round((m.passed/m.enrolled)*100)}%`],["Avg Score","85%"]].map(([l,v])=>(
                        <div key={l} className="bg-gradient-to-b from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                          <p className="font-black text-[#0b1426] text-xl">{v}</p>
                          <p className="text-slate-400 text-xs mt-1">{l}</p>
                        </div>
                      ))}
                    </div>
                    <button className={`w-full bg-gradient-to-r ${m.color} text-white font-bold py-3 rounded-xl text-sm transition-all hover:opacity-90 shadow-md`}>
                      {m.done?"Retake Module":"Begin Module →"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 4 — EARNINGS
════════════════════════════════════════ */
function Earnings() {
  const weekly = [{d:"Mon",v:120},{d:"Tue",v:85},{d:"Wed",v:210},{d:"Thu",v:95},{d:"Fri",v:175},{d:"Sat",v:310},{d:"Sun",v:145}];
  const max = Math.max(...weekly.map(w=>w.v));
  const history = [
    { date:"May 19", task:"AI Annotation — Batch #14",   amt:85,  status:"Paid",    method:"PayPal" },
    { date:"May 18", task:"Medical Image Review #008",   amt:120, status:"Paid",    method:"Wise"   },
    { date:"May 18", task:"Content QA — FR/EN Set B",    amt:47,  status:"Paid",    method:"PayPal" },
    { date:"May 17", task:"Brand Survey Batch #22",      amt:28,  status:"Paid",    method:"Bank"   },
    { date:"May 16", task:"Driving Scene Tagging",       amt:115, status:"Pending", method:"Wise"   },
    { date:"May 14", task:"AI Annotation — Batch #12",   amt:92,  status:"Paid",    method:"PayPal" },
  ];
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Earnings Dashboard" icon="💰" sub="Track your income, payouts, and payment history."/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Today"      value="$342.50" sub="+12% yesterday"     gradient="bg-gradient-to-br from-[#00b894] to-[#00d4a3]" icon="💰"/>
        <StatCard label="This Week"  value="$1,140"  sub="7 tasks done"       gradient="bg-gradient-to-br from-[#0b1426] to-[#1e3a5f]" icon="📅"/>
        <StatCard label="This Month" value="$4,280"  sub="best month yet 🎉"  gradient="bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]" icon="📆"/>
        <StatCard label="Pending"    value="$115.00" sub="processing 18 hrs"  gradient="bg-gradient-to-br from-[#6366f1] to-[#818cf8]" icon="⏳"/>
      </div>
 
      {/* Bar chart */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-[#0b1426] text-lg">This Week&apos;s Earnings</h3>
          <div className="flex items-center gap-2 bg-[#00d4a3]/10 px-4 py-2 rounded-full">
            <span className="h-2 w-2 rounded-full bg-[#00d4a3]"/>
            <span className="text-[#00d4a3] font-bold text-sm">$1,140 total</span>
          </div>
        </div>
        <div className="flex items-end gap-3 h-48">
          {weekly.map(({d,v})=>(
            <div key={d} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#0b1426] text-white text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap">
                ${v}
              </div>
              <div className="w-full rounded-t-xl transition-all duration-500 group-hover:opacity-90"
                style={{
                  height:`${(v/max)*160}px`,
                  background: d==="Sat"
                    ? "linear-gradient(to top, #00b894, #00d4a3)"
                    : "linear-gradient(to top, #0b1426, #1e3a5f)"
                }}/>
              <p className="text-xs text-slate-400 font-medium">{d}</p>
            </div>
          ))}
        </div>
      </GlassCard>
 
      {/* Balance card */}
      <div className="relative overflow-hidden rounded-2xl p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1426] via-[#1a2a45] to-[#0b1426]"/>
        <div className="absolute inset-0 opacity-10"
          style={{backgroundImage:"radial-gradient(circle at 20% 50%, #00d4a3 0%, transparent 50%), radial-gradient(circle at 80% 50%, #f59e0b 0%, transparent 50%)"}}/>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-slate-400 text-sm mb-1">Available Balance</p>
            <p className="text-4xl font-black text-white">$<span className="text-[#00d4a3]">227</span>.50</p>
            <p className="text-slate-400 text-sm mt-1">Minimum $10 · Premium: 24-hr processing</p>
          </div>
          <button className="shrink-0 bg-gradient-to-r from-[#00d4a3] to-[#00b894] hover:opacity-90 text-[#0b1426] font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-xl shadow-[#00d4a3]/25">
            Request Payout →
          </button>
        </div>
      </div>
 
      {/* History table */}
      <GlassCard className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">Payment History</h3>
          <button className="text-xs bg-[#00d4a3]/10 text-[#00d4a3] hover:bg-[#00d4a3]/20 font-semibold px-4 py-1.5 rounded-full transition-all">Download CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TH cols={["Date","Task","Amount","Method","Status"]}/>
            <tbody>
              {history.map((h,i)=>(
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 text-slate-400 text-xs font-medium">{h.date}</td>
                  <td className="py-3.5 px-4 text-[#0b1426] font-medium">{h.task}</td>
                  <td className="py-3.5 px-4 font-black text-[#0b1426]">${h.amt}</td>
                  <td className="py-3.5 px-4"><span className="text-slate-500 text-xs bg-slate-100 px-2.5 py-1 rounded-full">{h.method}</span></td>
                  <td className="py-3.5 px-4"><Chip text={h.status} color={h.status==="Paid"?"green":"yellow"}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 5 — QUALITY
════════════════════════════════════════ */
function Quality() {
  const tc=(t:string):BC=>t==="Elite"?"green":t==="Pro"?"blue":t==="Standard"?"yellow":"red";
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Quality & Accuracy Monitoring" icon="🎯" sub="Track worker performance and maintain quality standards."/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Platform Acc." value="94.2%"  sub="+1.3% this week"     gradient="bg-gradient-to-br from-[#00b894] to-[#00d4a3]" icon="🎯"/>
        <StatCard label="Elite Workers" value="284"    sub="top 2.3%"            gradient="bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]" icon="🏆"/>
        <StatCard label="Watch List"    value="38"     sub="acc below 75%"       gradient="bg-gradient-to-br from-[#ef4444] to-[#f87171]" icon="⚠️"/>
        <StatCard label="Avg Speed"     value="34 min" sub="-3 min vs last wk"   gradient="bg-gradient-to-br from-[#0ea5e9] to-[#38bdf8]" icon="⚡"/>
      </div>
 
      <div className="grid lg:grid-cols-2 gap-5">
        <GlassCard className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Accuracy by Category</h3>
          <div className="space-y-5">
            {[["AI Annotation",96,"from-[#00b894] to-[#00d4a3]"],["Data Review",93,"from-[#3b82f6] to-[#60a5fa]"],["Content QA",91,"from-[#8b5cf6] to-[#a78bfa]"],["Image Labeling",88,"from-[#f59e0b] to-[#fbbf24]"],["Video Labeling",85,"from-[#ef4444] to-[#f87171]"],["Document Review",79,"from-[#ec4899] to-[#f472b6]"]].map(([cat,s,grad])=>(
              <div key={String(cat)}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600 font-semibold">{cat}</span>
                  <span className="text-sm font-black text-[#0b1426]">{s}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${grad}`} style={{width:`${s}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
 
        {/* Worker photo leaderboard */}
        <GlassCard className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Top Worker Leaderboard</h3>
          <div className="space-y-3">
            {WORKER_PHOTOS.map((w,i)=>(
              <div key={w.name} className={`flex items-center gap-3 p-3 rounded-xl transition-all ${i<3?"bg-gradient-to-r from-[#00d4a3]/5 to-transparent border border-[#00d4a3]/20":"hover:bg-slate-50"}`}>
                <div className="text-lg font-black w-8 text-center shrink-0">
                  {i===0?"🥇":i===1?"🥈":i===2?"🥉":`#${i+1}`}
                </div>
                <WorkerAvatar photo={w.photo} name={w.name} size="h-10 w-10"/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-[#0b1426] text-sm">{w.name}</p>
                    <Chip text={w.tier} color={tc(w.tier)}/>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Bar v={w.acc} color={w.acc>=90?"#00d4a3":w.acc>=80?"#f59e0b":"#ef4444"} height="h-1.5"/>
                    <span className="text-xs text-slate-500 whitespace-nowrap font-semibold">{w.acc}%</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-black text-[#0b1426] text-sm">{w.tasks}</p>
                  <p className="text-slate-400 text-xs">tasks</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 6 — MANAGEMENT
════════════════════════════════════════ */
function Management() {
  const pipeline=[
    {s:"Submitted",n:4,  grad:"from-[#3b82f6] to-[#60a5fa]"},
    {s:"In Review",n:7,  grad:"from-[#f59e0b] to-[#fbbf24]"},
    {s:"Approved", n:6,  grad:"from-[#00b894] to-[#00d4a3]"},
    {s:"Live",     n:6,  grad:"from-[#0b1426] to-[#1e3a5f]"},
    {s:"Closing",  n:1,  grad:"from-[#8b5cf6] to-[#a78bfa]"},
    {s:"Completed",n:34, grad:"from-[#64748b] to-[#94a3b8]"},
  ];
  const queue=[
    {id:"T-2041",worker:"Amara K.", project:"AI Annotation",   time:"9:14am",  status:"Under Review",flag:false, photo:WORKER_PHOTOS[0].photo},
    {id:"T-2042",worker:"Diego R.", project:"Medical Imaging", time:"9:02am",  status:"Approved",    flag:false, photo:WORKER_PHOTOS[2].photo},
    {id:"T-2043",worker:"Priya M.", project:"Content QA",      time:"8:45am",  status:"Flagged",     flag:true,  photo:WORKER_PHOTOS[1].photo},
    {id:"T-2044",worker:"Leo F.",   project:"Brand Survey",     time:"Yesterday",status:"Approved",   flag:false, photo:WORKER_PHOTOS[3].photo},
    {id:"T-2045",worker:"Carlos V.",project:"Data Review",      time:"Yesterday",status:"Rejected",   flag:true,  photo:WORKER_PHOTOS[5].photo},
  ];
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Project Management Panel" icon="🗂️" sub="Full lifecycle control over tasks and worker submissions."/>
      <GlassCard className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Project Pipeline</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {pipeline.map(({s,n,grad})=>(
            <div key={s} className={`text-center p-4 bg-gradient-to-b ${grad} rounded-2xl text-white shadow-md`}>
              <p className="text-3xl font-black mb-1">{n}</p>
              <p className="text-white/70 text-xs font-medium">{s}</p>
            </div>
          ))}
        </div>
      </GlassCard>
      <div className="grid sm:grid-cols-3 gap-4">
        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00d4a3] to-[#00b894] text-[#0b1426] font-bold py-3.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-lg shadow-[#00d4a3]/25">➕ Create Project</button>
        <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#0b1426] to-[#1e3a5f] text-white font-bold py-3.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-lg">✅ Bulk Approve</button>
        <button className="flex items-center justify-center gap-2 bg-white border-2 border-slate-200 text-[#0b1426] font-bold py-3.5 rounded-xl text-sm hover:border-[#00d4a3] hover:text-[#00d4a3] transition-all">📥 Export Report</button>
      </div>
      <GlassCard className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-black text-[#0b1426]">Submission Queue</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <TH cols={["Task ID","Worker","Project","Submitted","Status","Actions"]}/>
            <tbody>
              {queue.map(t=>(
                <tr key={t.id} className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${t.flag?"bg-red-50/40":""}`}>
                  <td className="py-3.5 px-4 text-slate-400 text-xs font-mono font-bold">{t.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <WorkerAvatar photo={t.photo} name={t.worker} size="h-8 w-8"/>
                      <span className="font-semibold text-[#0b1426] text-sm">{t.worker}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 text-xs">{t.project}</td>
                  <td className="py-3.5 px-4 text-slate-400 text-xs">{t.time}</td>
                  <td className="py-3.5 px-4"><Chip text={t.status} color={t.status==="Approved"?"green":t.status==="Flagged"||t.status==="Rejected"?"red":"yellow"}/></td>
                  <td className="py-3.5 px-4">
                    <div className="flex gap-2">
                      <button className="text-xs bg-[#00d4a3]/10 text-[#00d4a3] hover:bg-[#00d4a3]/20 font-semibold px-3 py-1 rounded-lg transition-all">Review</button>
                      {t.flag&&<button className="text-xs bg-red-50 text-red-400 hover:bg-red-100 font-semibold px-3 py-1 rounded-lg transition-all">Escalate</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 7 — PAYMENTS
════════════════════════════════════════ */
const NL=["New task available","Task approved / rejected","Payout processed","Weekly earnings summary","Platform announcements","New training modules"];
const ND=[true,true,true,false,true,false];
 
function Payments() {
  const [saved, setSaved] = useState(false);
  const [tg, setTg] = useState(ND);
  const flip = useCallback((i:number)=>setTg(p=>p.map((v,idx)=>idx===i?!v:v)),[]);
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Payments & Settings" icon="💳" sub="Manage your payout method, plan, and account preferences."/>
      <div className="grid sm:grid-cols-2 gap-5">
        <GlassCard className="p-6">
          <h3 className="font-black text-[#0b1426] mb-4">Payout Methods</h3>
          <div className="space-y-3">
            {[{m:"PayPal",a:"jane@example.com",p:true,icon:"🅿️"},{m:"Wise",a:"+254 712 345 678",p:false,icon:"💳"},{m:"Bank Transfer",a:"KE ···· 4421",p:false,icon:"🏦"}].map(({m,a,p,icon})=>(
              <div key={m} className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${p?"border-[#00d4a3] bg-[#00d4a3]/5 shadow-sm":"border-slate-100 hover:border-slate-200"}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{icon}</span>
                  <div><p className="text-[#0b1426] font-bold text-sm">{m}</p><p className="text-slate-400 text-xs">{a}</p></div>
                </div>
                {p?<Chip text="Primary" color="teal"/>:<button className="text-xs text-[#00d4a3] font-semibold hover:underline">Set Primary</button>}
              </div>
            ))}
            <button className="w-full border-2 border-dashed border-slate-200 hover:border-[#00d4a3] text-slate-400 hover:text-[#00d4a3] font-semibold py-3 rounded-xl text-sm transition-all">
              + Add Payment Method
            </button>
          </div>
        </GlassCard>
 
        <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-[#0b1426] via-[#1a2a45] to-[#0b1426]">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-[#f59e0b]/10 blur-3xl"/>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-white text-lg">Current Plan</h3>
              <span className="bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-[#0b1426] text-xs font-black px-3 py-1.5 rounded-full">PREMIUM</span>
            </div>
            <p className="text-5xl font-black text-white mb-1">$100<span className="text-slate-400 text-lg font-normal">/mo</span></p>
            <p className="text-slate-400 text-sm mb-5">Renews June 1, 2026</p>
            <div className="space-y-2 mb-5">
              {["All task categories","Earn $300+/day","24-hr payouts","Priority support"].map(f=>(
                <div key={f} className="flex items-center gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-[#f59e0b]/20 flex items-center justify-center shrink-0">
                    <svg className="h-3 w-3 text-[#f59e0b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
                  </div>
                  <span className="text-slate-300 text-sm">{f}</span>
                </div>
              ))}
            </div>
            <button className="w-full border-2 border-white/20 hover:border-white/40 text-white font-semibold py-2.5 rounded-xl text-sm transition-all hover:bg-white/5">
              Manage Subscription
            </button>
          </div>
        </div>
      </div>
 
      <GlassCard className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Account Preferences</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {[["Full Name","Jane Doe","text"],["Email","jane@example.com","email"],["Country","Kenya","text"],["Language","English","text"]].map(([l,v,t])=>(
            <div key={l}>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{l}</label>
              <input type={t} defaultValue={v} className="w-full border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-3 text-sm text-[#0b1426] focus:outline-none focus:ring-4 focus:ring-[#00d4a3]/10 transition-all bg-slate-50/50"/>
            </div>
          ))}
        </div>
        <button onClick={()=>{setSaved(true);setTimeout(()=>setSaved(false),2000);}}
          className={`mt-5 font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-lg ${saved?"bg-emerald-500 text-white shadow-emerald-500/25":"bg-gradient-to-r from-[#00d4a3] to-[#00b894] text-[#0b1426] shadow-[#00d4a3]/25 hover:opacity-90"}`}>
          {saved?"✓ Saved Successfully!":"Save Changes"}
        </button>
      </GlassCard>
 
      <GlassCard className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Notification Preferences</h3>
        <div className="divide-y divide-slate-100">
          {NL.map((label,i)=>(
            <div key={label} className="flex items-center justify-between py-4">
              <div>
                <p className="text-[#0b1426] font-semibold text-sm">{label}</p>
                <p className="text-slate-400 text-xs mt-0.5">{tg[i]?"Notifications enabled":"Notifications disabled"}</p>
              </div>
              <button onClick={()=>flip(i)}
                className={`relative h-7 w-13 w-12 rounded-full transition-all duration-300 shadow-inner ${tg[i]?"bg-gradient-to-r from-[#00b894] to-[#00d4a3] shadow-[#00d4a3]/30":"bg-slate-200"}`}>
                <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${tg[i]?"left-6":"left-1"}`}/>
              </button>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 8 — NOTIFICATIONS
════════════════════════════════════════ */
function Notifications() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const ann=[
    {id:1,type:"New",   title:"New Premium Tasks Available",  body:"5 new advanced tasks added. Premium members get first access for 12 hours.",time:"10 min ago",pinned:true,  grad:"from-[#00b894]/10 to-transparent", border:"border-[#00d4a3]/30"},
    {id:2,type:"Update",title:"Payout Processing — May 19",  body:"All pending payouts from May 17–18 have been processed successfully.",      time:"2 hrs ago", pinned:false, grad:"from-blue-50 to-transparent",       border:"border-blue-200"},
    {id:3,type:"Alert", title:"Maintenance Window — May 22", body:"Platform offline 02:00–04:00 UTC May 22 for scheduled maintenance.",         time:"1 day ago", pinned:false, grad:"from-amber-50 to-transparent",      border:"border-amber-200"},
  ];
  const inbox=[
    {from:"Quality Team",subject:"Your task T-2038 was approved",        time:"5 min ago", read:false, photo:WORKER_PHOTOS[1].photo},
    {from:"Support",     subject:"Ticket #2039 has been resolved",        time:"1 hr ago",  read:false, photo:WORKER_PHOTOS[4].photo},
    {from:"Finance",     subject:"Payout of $227.50 sent via PayPal",     time:"3 hrs ago", read:false, photo:WORKER_PHOTOS[2].photo},
    {from:"Platform",    subject:"New AI Annotation Batch is live",       time:"6 hrs ago", read:true,  photo:WORKER_PHOTOS[0].photo},
    {from:"Quality Team",subject:"Task T-2031 feedback — please review",  time:"1 day ago", read:true,  photo:WORKER_PHOTOS[3].photo},
  ];
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Notifications & Announcements" icon="🔔" sub="Platform updates, task alerts, and your message inbox."/>
      <div className="space-y-3">
        {ann.filter(a=>!dismissed.includes(a.id)).map(a=>(
          <div key={a.id} className={`relative bg-gradient-to-r ${a.grad} border ${a.border} rounded-2xl p-5 shadow-sm`}>
            {a.pinned&&<span className="absolute top-4 right-14 text-[#00d4a3] text-xs font-bold flex items-center gap-1"><span>📌</span> Pinned</span>}
            <button onClick={()=>setDismissed(p=>[...p,a.id])}
              className="absolute top-4 right-4 h-7 w-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-all text-sm font-bold">×</button>
            <div className="flex items-start gap-4 pr-8">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${a.type==="Alert"?"bg-amber-100":a.type==="New"?"bg-[#00d4a3]/20":"bg-blue-100"}`}>
                {a.type==="Alert"?"⚠️":a.type==="New"?"🆕":"📢"}
              </div>
              <div>
                <p className="font-bold text-[#0b1426] mb-1">{a.title}</p>
                <p className="text-slate-500 text-sm">{a.body}</p>
                <p className="text-slate-400 text-xs mt-2 flex items-center gap-1">🕐 {a.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
 
      <GlassCard className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">Message Inbox</h3>
          <span className="bg-gradient-to-r from-[#00d4a3] to-[#00b894] text-[#0b1426] text-xs font-black px-3 py-1 rounded-full">3 unread</span>
        </div>
        <div className="divide-y divide-slate-100">
          {inbox.map(({from,subject,time,read,photo},i)=>(
            <div key={i} className={`flex items-center gap-4 px-6 py-4 hover:bg-slate-50 cursor-pointer transition-colors ${!read?"bg-[#00d4a3]/5":""}`}>
              <WorkerAvatar photo={photo} name={from} size="h-10 w-10"/>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!read?"font-bold text-[#0b1426]":"font-medium text-slate-600"}`}>{from}</p>
                <p className="text-slate-500 text-sm truncate">{subject}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <p className="text-slate-400 text-xs whitespace-nowrap">{time}</p>
                {!read&&<span className="h-2 w-2 rounded-full bg-[#00d4a3]"/>}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 9 — ANALYTICS
════════════════════════════════════════ */
function Analytics() {
  const [data,setData]=useState<Record<string,unknown>|null>(null);
  useEffect(()=>{fetch("/api/analytics").then(r=>r.json()).then(d=>{if(d.success)setData(d.data);}).catch(()=>{});},[]);
  const monthly=[{m:"Dec",v:61},{m:"Jan",v:67},{m:"Feb",v:72},{m:"Mar",v:78},{m:"Apr",v:84},{m:"May",v:92}];
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Community & Performance Analytics" icon="📊" sub="Platform-wide trends, worker growth, and task performance."/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Workers"    value={(data?.totalWorkers as number)?.toLocaleString()??"12,418"} sub="registered"     gradient="bg-gradient-to-br from-[#0b1426] to-[#1e3a5f]" icon="👥"/>
        <StatCard label="New Signups (7d)" value={String(data?.newSignups??892)}                               sub="+34% vs last wk" gradient="bg-gradient-to-br from-[#00b894] to-[#00d4a3]" icon="📈"/>
        <StatCard label="Tasks (Month)"    value={String(data?.tasksCompletedMonth??"4,821")}                  sub="completed"       gradient="bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]" icon="✅"/>
        <StatCard label="Total Paid Out"   value={`$${((data?.totalPaidOut as number)??3200000).toLocaleString()}`} sub="all time"  gradient="bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa]" icon="💸"/>
      </div>
 
      <div className="grid lg:grid-cols-2 gap-5">
        <GlassCard className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Plan Distribution</h3>
          <div className="space-y-5">
            {[{plan:"Free",count:7210,pct:58,grad:"from-slate-400 to-slate-500"},{plan:"Basic",count:3820,pct:31,grad:"from-[#00b894] to-[#00d4a3]"},{plan:"Premium",count:1388,pct:11,grad:"from-[#f59e0b] to-[#fbbf24]"}].map(({plan,count,pct,grad})=>(
              <div key={plan}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700">{plan} <span className="text-slate-400 font-normal">— {count.toLocaleString()}</span></span>
                  <span className="text-sm font-black text-[#0b1426]">{pct}%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${grad} transition-all duration-700`} style={{width:`${pct}%`}}/>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
 
        <GlassCard className="p-6">
          <h3 className="font-black text-[#0b1426] mb-5">Top Countries by Workers</h3>
          <div className="space-y-4">
            {[["🇰🇪 Kenya",2840,23],["🇵🇭 Philippines",2140,17],["🇮🇳 India",1920,15],["🇳🇬 Nigeria",1480,12],["🇧🇷 Brazil",980,8]].map(([c,w,p])=>(
              <div key={String(c)} className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-600 w-36">{c}</span>
                <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#0b1426] to-[#1e3a5f] transition-all duration-700" style={{width:`${p}%`}}/>
                </div>
                <span className="text-sm font-black text-[#0b1426] w-14 text-right">{Number(w).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
 
      <GlassCard className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Monthly Revenue Trend</h3>
        <div className="flex items-end gap-3 h-44">
          {monthly.map(({m,v},i)=>(
            <div key={m} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#0b1426] text-white text-xs font-bold px-2 py-1 rounded-lg">
                ${v}k
              </div>
              <div className="w-full rounded-t-xl transition-all duration-500 group-hover:opacity-80"
                style={{
                  height:`${(v/92)*140}px`,
                  background: i===monthly.length-1
                    ? "linear-gradient(to top, #00b894, #00d4a3)"
                    : "linear-gradient(to top, #0b1426, #1e3a5f)",
                }}/>
              <p className="text-xs text-slate-400 font-medium">{m}</p>
            </div>
          ))}
        </div>
      </GlassCard>
 
      {/* Working team photo strip */}
      <div className="rounded-2xl overflow-hidden relative h-40">
        <Image
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=200&fit=crop"
          alt="Team working remotely"
          fill className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1426]/80 to-[#0b1426]/40 flex items-center px-8">
          <div>
            <p className="text-white font-black text-xl">12,418 workers. 40+ countries. One platform.</p>
            <p className="text-slate-300 text-sm mt-1">Join the TaskNest community and start earning today.</p>
          </div>
          <Link href="/signup" className="ml-auto shrink-0 bg-[#00d4a3] hover:bg-[#00c494] text-[#0b1426] font-bold px-6 py-3 rounded-xl text-sm transition-all shadow-xl shadow-[#00d4a3]/30">
            Invite Workers →
          </Link>
        </div>
      </div>
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 10 — SECURITY
════════════════════════════════════════ */
function Security() {
  const [twoFA, setTwoFA] = useState(true);
  const pending=[
    {id:"1",name:"Michael Torres",email:"m.torres@email.com",country:"Colombia", photo:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face"},
    {id:"2",name:"Fatima Al-Amin",email:"fatima.a@email.com",country:"Egypt",    photo:"https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face"},
    {id:"3",name:"Yuki Tanaka",   email:"yuki.t@email.com",  country:"Japan",    photo:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face"},
    {id:"4",name:"Grace Ochieng", email:"grace.o@email.com", country:"Uganda",   photo:"https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=60&h=60&fit=crop&crop=face"},
  ];
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Account Verification & Security" icon="🔒" sub="Manage identity verification, 2FA, and account security."/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Verified"       value="11,840" sub="95.3% of total"  gradient="bg-gradient-to-br from-[#00b894] to-[#00d4a3]" icon="✅"/>
        <StatCard label="Pending"        value="27"     sub="avg wait 6 hrs"  gradient="bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]" icon="⏳"/>
        <StatCard label="Rejected (30d)" value="14"     sub="fraudulent docs" gradient="bg-gradient-to-br from-[#ef4444] to-[#f87171]" icon="❌"/>
        <StatCard label="2FA Enabled"    value="78%"    sub="of all accounts" gradient="bg-gradient-to-br from-[#6366f1] to-[#818cf8]" icon="🔐"/>
      </div>
      <GlassCard className="p-6">
        <h3 className="font-black text-[#0b1426] mb-5">Account Security Status</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#00d4a3]/5 to-transparent border-2 border-[#00d4a3]/20 rounded-xl">
            <div>
              <p className="font-bold text-[#0b1426] text-sm">Two-Factor Authentication (2FA)</p>
              <p className="text-slate-400 text-xs mt-0.5">Extra protection via authenticator app</p>
            </div>
            <button onClick={()=>setTwoFA(v=>!v)}
              className={`relative h-7 w-12 rounded-full transition-all duration-300 shadow-inner ${twoFA?"bg-gradient-to-r from-[#00b894] to-[#00d4a3]":"bg-slate-200"}`}>
              <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${twoFA?"left-6":"left-1"}`}/>
            </button>
          </div>
          {[["📧","Email Verified","Confirmed Mar 2025"],["🪪","Identity Document","Govt ID verified"],["💳","Payment Method","PayPal · jane@example.com"],["🔑","Password Strength","Strong — last changed 30d ago"]].map(([icon,label,detail])=>(
            <div key={String(label)} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-xl shadow-sm border border-slate-100">{icon}</div>
                <div><p className="font-semibold text-[#0b1426] text-sm">{String(label)}</p><p className="text-slate-400 text-xs">{String(detail)}</p></div>
              </div>
              <Chip text="Verified" color="green"/>
            </div>
          ))}
          <button className="text-sm text-[#00d4a3] hover:underline font-semibold">Change Password →</button>
        </div>
      </GlassCard>
 
      <GlassCard className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">Pending Identity Verifications</h3>
          <Chip text="27 pending" color="yellow"/>
        </div>
        <div className="divide-y divide-slate-100">
          {pending.map(p=>(
            <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
              <WorkerAvatar photo={p.photo} name={p.name} size="h-11 w-11"/>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[#0b1426] text-sm">{p.name}</p>
                <p className="text-slate-400 text-xs">{p.email} · {p.country}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-xs bg-[#00d4a3]/10 text-[#00d4a3] hover:bg-[#00d4a3]/20 font-bold px-4 py-2 rounded-xl transition-all">Approve</button>
                <button className="text-xs bg-red-50 text-red-400 hover:bg-red-100 font-bold px-4 py-2 rounded-xl transition-all">Reject</button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 11 — SUPPORT
════════════════════════════════════════ */
function Support() {
  const tickets=[
    {id:"1",name:"Carlos V.", subject:"Task rejected without explanation",          priority:"High",   status:"Open",        agent:"Sarah M.", photo:WORKER_PHOTOS[5].photo},
    {id:"2",name:"Amara K.",  subject:"Payout not received after 72 hours",        priority:"High",   status:"In Progress", agent:"James O.", photo:WORKER_PHOTOS[0].photo},
    {id:"3",name:"Diego R.",  subject:"Cannot access Premium tasks after upgrade",  priority:"Medium", status:"Resolved",    agent:"Lena S.",  photo:WORKER_PHOTOS[2].photo},
    {id:"4",name:"Priya M.",  subject:"Training module not loading on mobile",     priority:"Low",    status:"Resolved",    agent:"James O.", photo:WORKER_PHOTOS[1].photo},
    {id:"5",name:"Yuki T.",   subject:"Verification document upload failing",       priority:"Medium", status:"Open",        agent:"—",        photo:""},
  ];
  const pc=(p:string):BC=>p==="High"?"red":p==="Medium"?"yellow":"green";
  const sc=(s:string):BC=>s==="Open"?"red":s==="In Progress"?"yellow":"green";
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Support Center" icon="🛟" sub="Manage all worker support tickets and escalations."/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open Tickets"  value="14"  sub="3 high priority"    gradient="bg-gradient-to-br from-[#ef4444] to-[#f87171]" icon="🔴"/>
        <StatCard label="In Progress"   value="8"   sub="assigned to agents" gradient="bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]" icon="🟡"/>
        <StatCard label="Resolved (7d)" value="62"  sub="avg 3.2 hr resolve" gradient="bg-gradient-to-br from-[#00b894] to-[#00d4a3]" icon="🟢"/>
        <StatCard label="Satisfaction"  value="96%" sub="positive ratings"   gradient="bg-gradient-to-br from-[#6366f1] to-[#818cf8]" icon="⭐"/>
      </div>
      <GlassCard className="p-6">
        <h3 className="font-black text-[#0b1426] mb-4">Quick Response</h3>
        <div className="grid sm:grid-cols-3 gap-3 mb-3">
          <input placeholder="Ticket ID e.g. #2041" className="border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-4 focus:ring-[#00d4a3]/10 transition-all bg-slate-50"/>
          <select className="border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-2.5 text-sm bg-slate-50 focus:outline-none transition-all">
            <option>Use template…</option>
            <option>Payout Delay Response</option>
            <option>Task Rejection Explanation</option>
            <option>Account Access Help</option>
          </select>
          <button className="bg-gradient-to-r from-[#0b1426] to-[#1e3a5f] text-white font-bold py-2.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-lg">Send Response</button>
        </div>
        <textarea rows={3} placeholder="Type your response here…" className="w-full border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#00d4a3]/10 transition-all resize-none bg-slate-50"/>
      </GlassCard>
      <GlassCard className="overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-black text-[#0b1426]">All Tickets</h3>
          <button className="text-xs bg-[#00d4a3]/10 text-[#00d4a3] hover:bg-[#00d4a3]/20 font-semibold px-4 py-1.5 rounded-full transition-all">Export CSV</button>
        </div>
        <div className="divide-y divide-slate-100">
          {tickets.map(t=>(
            <div key={t.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors">
              <WorkerAvatar photo={t.photo} name={t.name} size="h-10 w-10"/>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-bold text-[#0b1426] text-sm">{t.name}</p>
                  <Chip text={t.priority} color={pc(t.priority)}/>
                  <Chip text={t.status} color={sc(t.status)}/>
                </div>
                <p className="text-slate-500 text-xs truncate">{t.subject}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-slate-400 text-xs">{t.agent}</p>
                <button className="text-xs bg-[#00d4a3]/10 text-[#00d4a3] hover:bg-[#00d4a3]/20 font-semibold px-3 py-1 rounded-lg mt-1 transition-all">Open</button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
 
/* ════════════════════════════════════════
   SECTION 12 — REVIEW
════════════════════════════════════════ */
function Review() {
  const [sel,  setSel]  = useState<number|null>(null);
  const [dec,  setDec]  = useState<Record<number,string>>({});
  const [note, setNote] = useState("");
 
  const queue=[
    {id:1, taskId:"T-2041", worker:"Carlos V.", project:"Data Review",    time:"9:14am", acc:71, flags:["Inconsistent labels","3 blank fields"], risk:"High",   photo:WORKER_PHOTOS[5].photo},
    {id:2, taskId:"T-2043", worker:"Priya M.",  project:"Content QA",     time:"8:45am", acc:88, flags:["Minor phrasing issue"],                 risk:"Low",    photo:WORKER_PHOTOS[1].photo},
    {id:3, taskId:"T-2050", worker:"James O.",  project:"Image Labeling", time:"8:12am", acc:65, flags:["Missing boxes","Wrong class"],           risk:"High",   photo:WORKER_PHOTOS[3].photo},
    {id:4, taskId:"T-2051", worker:"Lena S.",   project:"AI Annotation",  time:"7:55am", acc:92, flags:[],                                        risk:"None",   photo:WORKER_PHOTOS[4].photo},
    {id:5, taskId:"T-2052", worker:"Michael T.",project:"Video Labeling", time:"7:30am", acc:78, flags:["Timestamp drift"],                       risk:"Medium", photo:WORKER_PHOTOS[2].photo},
  ];
  const rc=(r:string):BC=>r==="High"?"red":r==="Medium"?"yellow":r==="Low"?"blue":"green";
  const item=queue.find(q=>q.id===sel)??null;
 
  return (
    <div className="space-y-6">
      <SectionHeader title="Task Review System" icon="✅" sub="QA queue — approve, flag, or reject worker submissions."/>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pending Review" value="12"   sub="oldest: 4 hrs ago"  gradient="bg-gradient-to-br from-[#f59e0b] to-[#fbbf24]" icon="⏳"/>
        <StatCard label="High Risk"      value="3"    sub="needs urgent review" gradient="bg-gradient-to-br from-[#ef4444] to-[#f87171]" icon="🔴"/>
        <StatCard label="Approved Today" value="48"   sub="auto + manual"       gradient="bg-gradient-to-br from-[#00b894] to-[#00d4a3]" icon="✅"/>
        <StatCard label="Rejection Rate" value="6.2%" sub="-0.8% vs last week"  gradient="bg-gradient-to-br from-[#6366f1] to-[#818cf8]" icon="📉"/>
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Queue */}
        <GlassCard className="overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="font-black text-[#0b1426]">Review Queue</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {queue.map(q=>(
              <div key={q.id} onClick={()=>{setSel(q.id);setNote("");}}
                className={`px-5 py-4 cursor-pointer transition-all ${sel===q.id?"bg-gradient-to-r from-[#00d4a3]/10 to-transparent border-l-4 border-[#00d4a3]":"hover:bg-slate-50/80 border-l-4 border-transparent"}`}>
                <div className="flex items-center gap-3">
                  <WorkerAvatar photo={q.photo} name={q.worker} size="h-11 w-11"/>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{q.taskId}</span>
                      <Chip text={q.risk==="None"?"Clean":q.risk+" Risk"} color={rc(q.risk)}/>
                    </div>
                    <p className="font-bold text-[#0b1426] text-sm">{q.worker}</p>
                    <p className="text-slate-400 text-xs">{q.project} · {q.time}</p>
                    {q.flags.length>0&&(
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {q.flags.map(f=><span key={f} className="text-xs bg-red-50 text-red-500 border border-red-100 px-2 py-0.5 rounded-full">{f}</span>)}
                      </div>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`font-black text-xl ${q.acc>=85?"text-[#00d4a3]":q.acc>=75?"text-[#f59e0b]":"text-red-500"}`}>{q.acc}%</p>
                    {dec[q.id]&&<p className={`text-xs font-bold mt-0.5 ${dec[q.id]==="Approved"?"text-[#00d4a3]":dec[q.id]==="Flagged"?"text-[#f59e0b]":"text-red-500"}`}>→ {dec[q.id]}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
 
        {/* Review panel */}
        <GlassCard className="p-6">
          {item?(
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <WorkerAvatar photo={item.photo} name={item.worker} size="h-14 w-14"/>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded">{item.taskId}</span>
                    <Chip text={item.risk==="None"?"Clean":item.risk+" Risk"} color={rc(item.risk)}/>
                  </div>
                  <h3 className="font-black text-[#0b1426] text-xl">{item.worker}</h3>
                  <p className="text-slate-400 text-sm">{item.project} · {item.time}</p>
                </div>
              </div>
 
              <div className={`rounded-2xl p-5 ${item.acc>=85?"bg-gradient-to-br from-[#00d4a3]/10 to-emerald-50 border border-[#00d4a3]/20":item.acc>=75?"bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200":"bg-gradient-to-br from-red-50 to-rose-50 border border-red-200"}`}>
                <p className="text-slate-500 text-xs mb-2 font-bold uppercase tracking-wider">Accuracy Score</p>
                <p className={`text-6xl font-black mb-3 ${item.acc>=85?"text-[#00d4a3]":item.acc>=75?"text-[#f59e0b]":"text-red-500"}`}>{item.acc}<span className="text-3xl">%</span></p>
                <div className="h-3 bg-white/60 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{width:`${item.acc}%`,background:item.acc>=85?"#00d4a3":item.acc>=75?"#f59e0b":"#ef4444"}}/>
                </div>
                <p className="text-slate-500 text-xs mt-2 font-medium">
                  {item.acc>=85?"✓ Meets quality standard":item.acc>=75?"⚠️ Below standard — review flags":"✗ Fails quality standard"}
                </p>
              </div>
 
              {item.flags.length>0&&(
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Quality Flags</p>
                  <div className="space-y-2">
                    {item.flags.map(f=>(
                      <div key={f} className="flex items-center gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                        <span className="text-red-400 text-base">⚠️</span>
                        <span className="text-red-600 text-sm font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
 
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Reviewer Note</p>
                <textarea rows={3} value={note} onChange={e=>setNote(e.target.value)}
                  placeholder="Add feedback for the worker (optional)…"
                  className="w-full border-2 border-slate-100 focus:border-[#00d4a3] rounded-xl px-4 py-3 text-sm text-[#0b1426] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#00d4a3]/10 transition-all resize-none bg-slate-50"/>
              </div>
 
              <div className="grid grid-cols-3 gap-3">
                {(["Approved","Flagged","Rejected"] as const).map(d=>(
                  <button key={d} onClick={()=>setDec(p=>({...p,[item.id]:d}))}
                    className={`py-3.5 rounded-xl text-sm font-bold transition-all shadow-sm ${
                      dec[item.id]===d
                        ? d==="Approved"?"bg-gradient-to-r from-[#00b894] to-[#00d4a3] text-white shadow-[#00d4a3]/25"
                          :d==="Flagged"?"bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] text-[#0b1426] shadow-amber-200"
                          :"bg-gradient-to-r from-[#ef4444] to-[#f87171] text-white shadow-red-200"
                        : d==="Approved"?"bg-[#00d4a3]/10 text-[#00d4a3] hover:bg-[#00d4a3]/20 border-2 border-[#00d4a3]/20"
                          :d==="Flagged"?"bg-amber-50 text-amber-600 hover:bg-amber-100 border-2 border-amber-200"
                          :"bg-red-50 text-red-500 hover:bg-red-100 border-2 border-red-200"
                    }`}>
                    {d==="Approved"?"✅":d==="Flagged"?"🚩":"❌"} {d}
                  </button>
                ))}
              </div>
              {dec[item.id]&&(
                <button onClick={()=>setSel(null)}
                  className="w-full bg-gradient-to-r from-[#0b1426] to-[#1e3a5f] hover:opacity-90 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg">
                  Submit Decision & Next →
                </button>
              )}
            </div>
          ):(
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-[#00d4a3]/20 to-[#00d4a3]/5 flex items-center justify-center text-4xl mb-4">👈</div>
              <h3 className="font-black text-[#0b1426] text-lg mb-2">Select a Task to Review</h3>
              <p className="text-slate-400 text-sm">Click any item in the queue to open the review panel.</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}
 
/* ════════════════════════════════════════
   RENDER SWITCH
════════════════════════════════════════ */
function renderSection(s: Section) {
  switch(s) {
    case "overview":      return <Overview/>;
    case "projects":      return <Projects/>;
    case "training":      return <Training/>;
    case "earnings":      return <Earnings/>;
    case "quality":       return <Quality/>;
    case "management":    return <Management/>;
    case "payments":      return <Payments/>;
    case "notifications": return <Notifications/>;
    case "analytics":     return <Analytics/>;
    case "security":      return <Security/>;
    case "support":       return <Support/>;
    case "review":        return <Review/>;
  }
}
 
/* ════════════════════════════════════════
   ROOT ADMIN PAGE
════════════════════════════════════════ */
export default function AdminDashboard() {
  const [active, setActive]           = useState<Section>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const label = NAV.find(n=>n.id===active)?.label??"";
 
  return (
    <div className="min-h-screen flex" style={{background:"linear-gradient(135deg, #f0fdf9 0%, #f1f5f9 50%, #faf5ff 100%)"}}>
 
      {/* Mobile overlay */}
      {sidebarOpen&&<div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" onClick={()=>setSidebarOpen(false)}/>}
 
      {/* ── SIDEBAR ── */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col transition-transform duration-300 ${sidebarOpen?"translate-x-0":"-translate-x-full lg:translate-x-0"}`}
        style={{background:"linear-gradient(180deg, #0b1426 0%, #0f1f3d 100%)"}}>
 
        {/* Logo */}
        <div className="p-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5 mb-4 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#00d4a3] to-[#00b894] flex items-center justify-center font-black text-sm text-[#0b1426] shadow-lg shadow-[#00d4a3]/30 group-hover:scale-105 transition-transform">
              TN
            </div>
            <span className="text-white font-bold text-lg">Task<span className="text-[#00d4a3]">Nest</span></span>
          </Link>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-[#00d4a3] animate-pulse"/>
            <span className="text-[#00d4a3] text-xs font-bold">Admin Portal</span>
          </div>
        </div>
 
        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV.map(({id,label,icon,badge})=>(
            <button key={id} onClick={()=>{setActive(id);setSidebarOpen(false);}}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left group ${
                active===id
                  ?"bg-gradient-to-r from-[#00d4a3]/20 to-[#00d4a3]/5 text-[#00d4a3] border border-[#00d4a3]/20 shadow-sm"
                  :"text-slate-400 hover:text-white hover:bg-white/5"
              }`}>
              <span className={`text-base w-6 text-center transition-transform group-hover:scale-110 ${active===id?"scale-110":""}`}>{icon}</span>
              <span className="flex-1 leading-tight">{label}</span>
              {badge&&<span className={`text-xs font-black px-1.5 py-0.5 rounded-full ${active===id?"bg-[#00d4a3] text-[#0b1426]":"bg-white/20 text-white"}`}>{badge}</span>}
            </button>
          ))}
        </nav>
 
        {/* Bottom user */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#00d4a3] to-[#00b894] flex items-center justify-center text-[#0b1426] font-black text-xs shrink-0">AD</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-bold truncate">Admin User</p>
              <p className="text-slate-500 text-xs truncate">admin@tasknest.io</p>
            </div>
            <Link href="/" className="text-slate-500 hover:text-[#00d4a3] text-xs transition-colors shrink-0 font-medium">←</Link>
          </div>
        </div>
      </aside>
 
      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0">
 
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-md border-b border-white/60 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={()=>setSidebarOpen(true)} className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors">
              <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-black text-[#0b1426] leading-tight">{label}</h1>
              <p className="text-slate-400 text-xs hidden sm:block">
                {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 border border-slate-200">
              <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
              </svg>
              <input placeholder="Search…" className="bg-transparent text-sm text-slate-600 placeholder-slate-400 outline-none w-28"/>
            </div>
            {/* Notification bell */}
            <button onClick={()=>setActive("notifications")} className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-colors">
              <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[#00d4a3] to-[#00b894] border-2 border-white"/>
            </button>
            {/* Avatar */}
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#0b1426] to-[#1e3a5f] flex items-center justify-center text-[#00d4a3] font-black text-xs shadow-md">
              AD
            </div>
          </div>
        </header>
 
        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {renderSection(active)}
        </main>
      </div>
    </div>
  );
}