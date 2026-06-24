import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, Model } from "mongoose";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string, { bufferCommands: false });
}

const UserSchema = new Schema({}, { strict: false });
const UserM: Model<mongoose.Document> =
  mongoose.models.User ?? mongoose.model("User", UserSchema);

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const filter: Record<string, unknown> = { role: "worker" };

    const plan               = searchParams.get("plan");
    const verificationStatus = searchParams.get("verificationStatus");
    const search             = searchParams.get("search");
    const page               = parseInt(searchParams.get("page")  ?? "1");
    const limit              = parseInt(searchParams.get("limit") ?? "20");

    if (plan)               filter.plan               = plan;
    if (verificationStatus) filter.verificationStatus = verificationStatus;
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName:  { $regex: search, $options: "i" } },
        { email:     { $regex: search, $options: "i" } },
      ];
    }

    const [workers, total] = await Promise.all([
      UserM.find(filter)
        .select("firstName lastName email plan country verificationStatus createdAt pendingBalance")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      UserM.countDocuments(filter),
    ]);

    return NextResponse.json({ success: true, data: workers, meta: { total, page, limit } });
  } catch (err) {
    console.error("[GET /api/admin/workers]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch workers" }, { status: 500 });
  }
}
