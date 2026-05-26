import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, Document, Model } from "mongoose";
 
/* ── DB connection ── */
const MONGODB_URI = process.env.MONGODB_URI as string;
declare global { var _mongoConn6: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }; }
const cache = global._mongoConn6 ?? { conn: null, promise: null };
global._mongoConn6 = cache;
async function connectDB() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  cache.conn = await cache.promise;
  return cache.conn;
}
 
/* ── User model (minimal) ── */
interface IUserT extends Document { completedModules: number[]; qualificationLevel: string; }
const UserTSchema = new Schema<IUserT>({ completedModules: [{ type: Number }], qualificationLevel: { type: String, default: "beginner" } }, { strict: false });
const UserT: Model<IUserT> = mongoose.models.User ?? mongoose.model<IUserT>("User", UserTSchema);
 
/* ── Static module data ── */
const MODULES = [
  { id:1, title:"Platform Orientation",         level:"Beginner",     duration:"20 min", required:true  },
  { id:2, title:"Data Labeling Fundamentals",   level:"Beginner",     duration:"35 min", required:true  },
  { id:3, title:"AI Annotation Best Practices", level:"Intermediate", duration:"50 min", required:false },
  { id:4, title:"Image & Video Labeling",        level:"Intermediate", duration:"45 min", required:false },
  { id:5, title:"Medical Data Handling",         level:"Advanced",     duration:"60 min", required:false },
  { id:6, title:"Legal & Compliance Review",     level:"Advanced",     duration:"55 min", required:false },
];
 
/* ── Handlers ── */
export async function GET(req: NextRequest) {
  try {
    const userId = new URL(req.url).searchParams.get("user");
    let completed: number[] = [];
    if (userId) {
      await connectDB();
      const user = await UserT.findById(userId).select("completedModules").lean();
      if (user) completed = user.completedModules;
    }
    return NextResponse.json({ success: true, data: MODULES.map(m => ({ ...m, completed: completed.includes(m.id) })) });
  } catch (err) {
    console.error("[GET /api/training]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch modules" }, { status: 500 });
  }
}
 
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, moduleId, score } = await req.json();
    if (!userId || !moduleId || score === undefined)
      return NextResponse.json({ success: false, error: "userId, moduleId, score required" }, { status: 400 });
    if (score < 70)
      return NextResponse.json({ success: false, error: "Need 70%+ to pass", score }, { status: 400 });
 
    await UserT.findByIdAndUpdate(userId, { $addToSet: { completedModules: moduleId } });
    const user  = await UserT.findById(userId).select("completedModules");
    const done  = user?.completedModules.length ?? 0;
    const level = done >= 5 ? "advanced" : done >= 3 ? "intermediate" : "beginner";
    await UserT.findByIdAndUpdate(userId, { qualificationLevel: level });
 
    return NextResponse.json({ success: true, data: { moduleId, score, newLevel: level } });
  } catch (err) {
    console.error("[POST /api/training]", err);
    return NextResponse.json({ success: false, error: "Failed to mark module complete" }, { status: 500 });
  }
}