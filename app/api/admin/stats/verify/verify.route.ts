import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, Model } from "mongoose";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string, { bufferCommands: false });
}

const UserSchema = new Schema({}, { strict: false });
const UserM: Model<mongoose.Document> =
  mongoose.models.User ?? mongoose.model("User", UserSchema);

// POST /api/admin/verify
// Body: { workerId: string, action: "approve" | "reject", reason?: string }
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { workerId, action, reason } = await req.json();

    if (!workerId || !action)
      return NextResponse.json(
        { success: false, error: "workerId and action are required" },
        { status: 400 }
      );

    if (!["approve", "reject"].includes(action))
      return NextResponse.json(
        { success: false, error: "action must be 'approve' or 'reject'" },
        { status: 400 }
      );

    const verificationStatus = action === "approve" ? "verified" : "rejected";
    const update: Record<string, unknown> = {
      verificationStatus,
      verifiedAt: action === "approve" ? new Date() : undefined,
      verificationRejectedReason: action === "reject" ? (reason ?? "Does not meet requirements") : undefined,
    };

    const worker = await UserM.findByIdAndUpdate(
      workerId,
      { $set: update },
      { new: true }
    ).select("firstName lastName email verificationStatus").lean();

    if (!worker)
      return NextResponse.json({ success: false, error: "Worker not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: worker });
  } catch (err) {
    console.error("[POST /api/admin/verify]", err);
    return NextResponse.json({ success: false, error: "Failed to update verification" }, { status: 500 });
  }
}
