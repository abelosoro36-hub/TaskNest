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

// GET /api/admin/review?status=pending&page=1&limit=20
// Returns task submissions waiting for review
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") ?? "Under Review";
    const page   = parseInt(searchParams.get("page")  ?? "1");
    const limit  = parseInt(searchParams.get("limit") ?? "20");

    // Each task document has a submissions array; unwind and filter by sub-status
    const [results, countResult] = await Promise.all([
      TaskM.aggregate([
        { $unwind: "$submissions" },
        { $match: { "submissions.status": status } },
        { $lookup: { from: "users", localField: "submissions.worker", foreignField: "_id", as: "workerInfo" } },
        { $unwind: { path: "$workerInfo", preserveNullAndEmptyArrays: true } },
        { $project: {
            taskId:     "$_id",
            taskTitle:  "$title",
            category:   "$category",
            submission: "$submissions",
            worker: {
              _id:       "$workerInfo._id",
              firstName: "$workerInfo.firstName",
              lastName:  "$workerInfo.lastName",
              email:     "$workerInfo.email",
            },
        }},
        { $sort: { "submission.submittedAt": -1 } },
        { $skip:  (page - 1) * limit },
        { $limit: limit },
      ]),
      TaskM.aggregate([
        { $unwind: "$submissions" },
        { $match: { "submissions.status": status } },
        { $count: "total" },
      ]),
    ]);

    return NextResponse.json({
      success: true,
      data:    results,
      meta:    { total: countResult[0]?.total ?? 0, page, limit },
    });
  } catch (err) {
    console.error("[GET /api/admin/review]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch review queue" }, { status: 500 });
  }
}

// POST /api/admin/review
// Body: { taskId, submissionId, workerId, action: "Approved"|"Flagged"|"Rejected", note?, payAmount? }
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { taskId, submissionId, workerId, action, note, payAmount } = await req.json();

    if (!taskId || !submissionId || !workerId || !action)
      return NextResponse.json(
        { success: false, error: "taskId, submissionId, workerId, action are required" },
        { status: 400 }
      );

    if (!["Approved", "Flagged", "Rejected"].includes(action))
      return NextResponse.json(
        { success: false, error: "action must be Approved, Flagged, or Rejected" },
        { status: 400 }
      );

    // Update the submission status inside the task document
    const task = await TaskM.findOneAndUpdate(
      { _id: taskId, "submissions._id": submissionId },
      {
        $set: {
          "submissions.$.status":     action,
          "submissions.$.reviewNote": note ?? "",
          "submissions.$.reviewedAt": new Date(),
        },
      },
      { new: true }
    );

    if (!task)
      return NextResponse.json({ success: false, error: "Task or submission not found" }, { status: 404 });

    // If approved and payAmount provided, create an earning payment record
    if (action === "Approved" && payAmount && payAmount > 0) {
      await PaymentM.create({
        worker:    workerId,
        task:      taskId,
        type:      "earning",
        amount:    payAmount,
        currency:  "USD",
        status:    "paid",
        reference: `EARN-${submissionId}-${Date.now()}`,
        note:      note ?? "Task approved",
      });
    }

    return NextResponse.json({ success: true, data: { taskId, submissionId, action } });
  } catch (err) {
    console.error("[POST /api/admin/review]", err);
    return NextResponse.json({ success: false, error: "Failed to submit review" }, { status: 500 });
  }
}
