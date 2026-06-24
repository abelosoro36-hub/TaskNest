import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, Model } from "mongoose";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string, { bufferCommands: false });
}

const loose = { strict: false } as const;
const TaskM: Model<mongoose.Document> =
  mongoose.models.Task ?? mongoose.model("Task", new Schema({}, loose));
const PaymentM: Model<mongoose.Document> =
  mongoose.models.Payment ?? mongoose.model("Payment", new Schema({}, loose));

// POST /api/admin/bulk
// Body: { action: "approve-all" | "pause-tasks" | "export-payments" }
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { action, taskIds, status } = await req.json();

    if (!action)
      return NextResponse.json({ success: false, error: "action is required" }, { status: 400 });

    /* ── Bulk approve all "Under Review" submissions ── */
    if (action === "approve-all") {
      const tasks = await TaskM.find({ "submissions.status": "Under Review" });
      let approvedCount = 0;

      for (const task of tasks) {
        const doc = task as unknown as {
          submissions: { status: string; worker: string; _id: string }[];
          save: () => Promise<void>;
          _id: string;
          payMin: number;
          payMax: number;
        };

        for (const sub of doc.submissions) {
          if (sub.status === "Under Review") {
            sub.status = "Approved";
            approvedCount++;

            // Create earning record at midpoint pay
            const avgPay = ((doc.payMin ?? 0) + (doc.payMax ?? 0)) / 2;
            await PaymentM.create({
              worker:    sub.worker,
              task:      doc._id,
              type:      "earning",
              amount:    avgPay,
              currency:  "USD",
              status:    "paid",
              reference: `BULK-${sub._id}-${Date.now()}`,
              note:      "Bulk approved by admin",
            });
          }
        }
        await task.save();
      }

      return NextResponse.json({ success: true, data: { approvedCount } });
    }

    /* ── Pause / unpause specific tasks ── */
    if (action === "pause-tasks") {
      if (!taskIds || !Array.isArray(taskIds))
        return NextResponse.json({ success: false, error: "taskIds array is required" }, { status: 400 });

      const newStatus = status ?? "paused";
      const result = await TaskM.updateMany(
        { _id: { $in: taskIds } },
        { $set: { status: newStatus } }
      );

      return NextResponse.json({ success: true, data: { modifiedCount: result.modifiedCount } });
    }

    /* ── Export payments summary (returns JSON for CSV generation on frontend) ── */
    if (action === "export-payments") {
      const payments = await PaymentM.find({ type: "payout", status: "paid" })
        .populate("worker", "firstName lastName email")
        .sort({ createdAt: -1 })
        .limit(500)
        .lean();

      const rows = payments.map((p) => {
        const w = p.worker as { firstName?: string; lastName?: string; email?: string } | null;
        return {
          date:   p.createdAt,
          worker: w ? `${w.firstName ?? ""} ${w.lastName ?? ""}`.trim() : "Unknown",
          email:  w?.email ?? "",
          amount: p.amount,
          method: p.method,
          status: p.status,
          ref:    p.reference,
        };
      });

      return NextResponse.json({ success: true, data: rows });
    }

    return NextResponse.json({ success: false, error: "Unknown action" }, { status: 400 });
  } catch (err) {
    console.error("[POST /api/admin/bulk]", err);
    return NextResponse.json({ success: false, error: "Bulk action failed" }, { status: 500 });
  }
}
