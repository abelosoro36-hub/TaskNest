import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, Document, Model } from "mongoose";
 
/* ── DB connection ── */
const MONGODB_URI = process.env.MONGODB_URI as string;
declare global { var _mongoConn2: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }; }
const cache = global._mongoConn2 ?? { conn: null, promise: null };
global._mongoConn2 = cache;
async function connectDB() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  cache.conn = await cache.promise;
  return cache.conn;
}
 
/* ── Task model ── */
interface ITask extends Document {
  title: string; description: string; category: string; client: string;
  plan: string; difficulty: string; payMin: number; payMax: number;
  durationMin: number; durationMax: number; totalSlots: number;
  filledSlots: number; deadline: Date; status: string;
  submissions: unknown[];
}
 
const TaskSchema = new Schema<ITask>({
  title:       { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category:    { type: String, required: true },
  client:      { type: String, required: true },
  plan:        { type: String, enum: ["basic","premium"],                              default: "basic"    },
  difficulty:  { type: String, enum: ["Beginner","Intermediate","Advanced"],           default: "Beginner" },
  payMin:      { type: Number, required: true },
  payMax:      { type: Number, required: true },
  durationMin: { type: Number, required: true },
  durationMax: { type: Number, required: true },
  totalSlots:  { type: Number, required: true },
  filledSlots: { type: Number, default: 0 },
  deadline:    { type: Date,   required: true },
  status:      { type: String, enum: ["draft","active","closing","completed","paused"], default: "draft"   },
  submissions: [{ type: Schema.Types.Mixed }],
}, { timestamps: true });
 
const Task: Model<ITask> =
  mongoose.models.Task ?? mongoose.model<ITask>("Task", TaskSchema);
 
/* ── Handlers ── */
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const filter: Record<string, unknown> = {};
    const status = searchParams.get("status");
    const plan   = searchParams.get("plan");
    const page   = parseInt(searchParams.get("page")  ?? "1");
    const limit  = parseInt(searchParams.get("limit") ?? "20");
 
    if (status) filter.status = status;
    if (plan)   filter.plan   = plan;
 
    const [tasks, total] = await Promise.all([
      Task.find(filter).select("-submissions").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Task.countDocuments(filter),
    ]);
 
    return NextResponse.json({ success: true, data: tasks, meta: { total, page, limit } });
  } catch (err) {
    console.error("[GET /api/tasks]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch tasks" }, { status: 500 });
  }
}
 
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const required = ["title","description","category","client","plan","difficulty","payMin","payMax","durationMin","durationMax","totalSlots","deadline"];
    for (const f of required) {
      if (body[f] === undefined || body[f] === "")
        return NextResponse.json({ success: false, error: `${f} is required` }, { status: 400 });
    }
    const task = await Task.create({ ...body, deadline: new Date(body.deadline), status: body.status ?? "draft" });
    return NextResponse.json({ success: true, data: task }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/tasks]", err);
    return NextResponse.json({ success: false, error: "Failed to create task" }, { status: 500 });
  }
}