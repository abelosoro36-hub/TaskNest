import { NextResponse } from "next/server";
import mongoose, { Schema, Model } from "mongoose";
 
/* ── DB connection ── */
const MONGODB_URI = process.env.MONGODB_URI as string;
declare global { var _mongoConn7: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }; }
const cache = global._mongoConn7 ?? { conn: null, promise: null };
global._mongoConn7 = cache;
async function connectDB() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  cache.conn = await cache.promise;
  return cache.conn;
}
 
/* ── Minimal models ── */
const S = { strict: false } as const;
const UserA:    Model<mongoose.Document> = mongoose.models.User    ?? mongoose.model("User",    new Schema({}, S));
const TaskA:    Model<mongoose.Document> = mongoose.models.Task    ?? mongoose.model("Task",    new Schema({}, S));
const PaymentA: Model<mongoose.Document> = mongoose.models.Payment ?? mongoose.model("Payment", new Schema({}, S));
 
export async function GET() {
  try {
    await connectDB();
 
    const [totalWorkers, newSignups, tasksResult, paidResult, countries, plans, monthly] = await Promise.all([
      UserA.countDocuments({ role: "worker" }),
      UserA.countDocuments({ role: "worker", createdAt: { $gte: new Date(Date.now() - 7 * 86400000) } }),
      TaskA.aggregate([{ $unwind: "$submissions" }, { $match: { "submissions.status": "approved" } }, { $count: "total" }]),
      PaymentA.aggregate([{ $match: { type: "payout", status: "paid" } }, { $group: { _id: null, total: { $sum: "$amount" } } }]),
      UserA.aggregate([
        { $match: { role: "worker", country: { $ne: "" } } },
        { $group: { _id: "$country", count: { $sum: 1 } } },
        { $sort: { count: -1 } }, { $limit: 5 },
      ]),
      UserA.aggregate([{ $match: { role: "worker" } }, { $group: { _id: "$plan", count: { $sum: 1 } } }]),
      PaymentA.aggregate([
        { $match: { type: "payout", status: "paid", createdAt: { $gte: new Date(Date.now() - 180 * 86400000) } } },
        { $group: { _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, total: { $sum: "$amount" } } },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ]),
    ]);
 
    return NextResponse.json({
      success: true,
      data: {
        totalWorkers,
        newSignups,
        tasksCompletedMonth: tasksResult[0]?.total ?? 0,
        totalPaidOut:        paidResult[0]?.total  ?? 0,
        topCountries:        countries,
        planBreakdown:       Object.fromEntries(plans.map((p: {_id:string;count:number}) => [p._id, p.count])),
        monthlyRevenue:      monthly,
      },
    });
  } catch (err) {
    console.error("[GET /api/analytics]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch analytics" }, { status: 500 });
  }
}