import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, Document, Model } from "mongoose";
 
/* ── DB connection ── */
const MONGODB_URI = process.env.MONGODB_URI as string;
declare global { var _mongoConn5: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }; }
const cache = global._mongoConn5 ?? { conn: null, promise: null };
global._mongoConn5 = cache;
async function connectDB() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  cache.conn = await cache.promise;
  return cache.conn;
}
 
/* ── Notification model ── */
interface INotification extends Document {
  user: mongoose.Types.ObjectId | null;
  type: string; title: string; body: string; read: boolean; pinned: boolean;
}
const NotifSchema = new Schema<INotification>({
  user:   { type: Schema.Types.ObjectId, ref: "User", default: null },
  type:   { type: String, enum: ["New","Update","Alert","Payment","Task"], default: "Update" },
  title:  { type: String, required: true },
  body:   { type: String, required: true },
  read:   { type: Boolean, default: false },
  pinned: { type: Boolean, default: false },
}, { timestamps: true });
const Notification: Model<INotification> =
  mongoose.models.Notification ?? mongoose.model<INotification>("Notification", NotifSchema);
 
/* ── Handlers ── */
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user");
    const unread = searchParams.get("unread");
    const filter: Record<string, unknown> = {
      $or: [{ user: null }, ...(userId ? [{ user: userId }] : [])],
    };
    if (unread === "true") filter.read = false;
    const notifications = await Notification.find(filter).sort({ pinned: -1, createdAt: -1 }).limit(50).lean();
    return NextResponse.json({ success: true, data: notifications });
  } catch (err) {
    console.error("[GET /api/notifications]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch notifications" }, { status: 500 });
  }
}
 
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { type, title, body: msgBody, userId = null, pinned = false } = await req.json();
    if (!type || !title || !msgBody)
      return NextResponse.json({ success: false, error: "type, title, body required" }, { status: 400 });
    const n = await Notification.create({ user: userId, type, title, body: msgBody, pinned });
    return NextResponse.json({ success: true, data: n }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/notifications]", err);
    return NextResponse.json({ success: false, error: "Failed to create notification" }, { status: 500 });
  }
}