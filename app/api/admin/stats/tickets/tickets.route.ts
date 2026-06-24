import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, Model } from "mongoose";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string, { bufferCommands: false });
}

interface ITicket {
  worker:   mongoose.Types.ObjectId;
  subject:  string;
  body:     string;
  priority: string;
  status:   string;
  agent:    string;
  messages: { from: string; text: string; createdAt: Date }[];
}

const TicketSchema = new Schema<ITicket>({
  worker:   { type: Schema.Types.ObjectId, ref: "User", required: true },
  subject:  { type: String, required: true, trim: true },
  body:     { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  status:   { type: String, enum: ["Open", "In Progress", "Resolved", "Closed"], default: "Open" },
  agent:    { type: String, default: "—" },
  messages: [{
    from:      { type: String },          // "worker" | "admin"
    text:      { type: String },
    createdAt: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

const TicketM: Model<ITicket> =
  mongoose.models.Ticket ?? mongoose.model<ITicket>("Ticket", TicketSchema);

// GET /api/admin/tickets?status=Open&priority=High&page=1&limit=20
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const filter: Record<string, unknown> = {};

    const status   = searchParams.get("status");
    const priority = searchParams.get("priority");
    const page     = parseInt(searchParams.get("page")  ?? "1");
    const limit    = parseInt(searchParams.get("limit") ?? "20");

    if (status)   filter.status   = status;
    if (priority) filter.priority = priority;

    const [tickets, total] = await Promise.all([
      TicketM.find(filter)
        .populate("worker", "firstName lastName email")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      TicketM.countDocuments(filter),
    ]);

    return NextResponse.json({ success: true, data: tickets, meta: { total, page, limit } });
  } catch (err) {
    console.error("[GET /api/admin/tickets]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch tickets" }, { status: 500 });
  }
}

// POST /api/admin/tickets
// Body: { ticketId, action: "respond"|"status", text?, status?, agent? }
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { ticketId, action, text, status, agent } = await req.json();

    if (!ticketId || !action)
      return NextResponse.json(
        { success: false, error: "ticketId and action are required" },
        { status: 400 }
      );

    let ticket;

    if (action === "respond") {
      if (!text)
        return NextResponse.json({ success: false, error: "text is required for respond action" }, { status: 400 });

      ticket = await TicketM.findByIdAndUpdate(
        ticketId,
        {
          $push: { messages: { from: "admin", text, createdAt: new Date() } },
          $set:  { status: "In Progress", ...(agent ? { agent } : {}) },
        },
        { new: true }
      ).populate("worker", "firstName lastName email");

    } else if (action === "status") {
      if (!status)
        return NextResponse.json({ success: false, error: "status is required for status action" }, { status: 400 });

      ticket = await TicketM.findByIdAndUpdate(
        ticketId,
        { $set: { status, ...(agent ? { agent } : {}) } },
        { new: true }
      ).populate("worker", "firstName lastName email");

    } else {
      return NextResponse.json({ success: false, error: "action must be 'respond' or 'status'" }, { status: 400 });
    }

    if (!ticket)
      return NextResponse.json({ success: false, error: "Ticket not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: ticket });
  } catch (err) {
    console.error("[POST /api/admin/tickets]", err);
    return NextResponse.json({ success: false, error: "Failed to update ticket" }, { status: 500 });
  }
}
