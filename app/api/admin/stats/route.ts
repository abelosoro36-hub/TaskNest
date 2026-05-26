import { NextResponse } from "next/server";
import mongoose, { Schema, Model } from "mongoose";
 
/* ── DB connection ── */
const MONGODB_URI = process.env.MONGODB_URI as string;
declare global { var _mongoConn8: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }; }
const cache = global._mongoConn8 ?? { conn: null, promise: null };
global._mongoConn8 = cache;
async function connectDB() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) cache.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
  cache.conn = await cache.promise;
  return cache.conn;
}
 
/* ── Minimal models (all use strict:false so existing collections work) ── */
const loose = { strict: false } as const;
const UserS:    Model<mongoose.Document> = mongoose.models.User    ?? mongoose.model("User",    new Schema({}, loose));
const TaskS:    Model<mongoose.Document> = mongoose.models.Task    ?? mongoose.model("Task",    new Schema({}, loose));
const PaymentS: Model<mongoose.Document> = mongoose.models.Payment ?? mongoose.model("Payment", new Schema({}, loose));
const TicketS:  Model<mongoose.Document> = mongoose.models.Ticket  ?? mongoose.model("Ticket",  new Schema({}, loose));
 
export async function GET() {
  try {
    await connectDB();
 
    const now   = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const month = new Date(now.getFullYear(), now.getMonth(), 1);
 
    const [
      totalWorkers,
      activeTasks,
      openTickets,
      pendingVerifications,
      todayPayoutsResult,
      monthPayoutsResult,
      planCountsResult,
    ] = await Promise.all([
      UserS.countDocuments({ role: "worker" }),
      TaskS.countDocuments({ status: "active" }),
      TicketS.countDocuments({ status: "Open" }),
      UserS.countDocuments({ verificationStatus: "pending" }),
      PaymentS.aggregate([
        { $match: { type: "payout", status: "paid", createdAt: { $gte: today } } },
        { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
      ]),
      PaymentS.aggregate([
        { $match: { type: "payout", status: "paid", createdAt: { $gte: month } } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      UserS.aggregate([
        { $match: { role: "worker" } },
        { $group: { _id: "$plan", count: { $sum: 1 } } },
      ]),
    ]);
 
    return NextResponse.json({
      success: true,
      data: {
        totalWorkers,
        activeTasks,
        openTickets,
        pendingVerifications,
        todayPayouts:  todayPayoutsResult[0]?.total ?? 0,
        todayCount:    todayPayoutsResult[0]?.count ?? 0,
        monthRevenue:  monthPayoutsResult[0]?.total ?? 0,
        planBreakdown: Object.fromEntries(
          planCountsResult.map((p: { _id: string; count: number }) => [p._id, p.count])
        ),
      },
    });
  } catch (err) {
    console.error("[GET /api/admin/stats]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch stats" }, { status: 500 });
  }
}