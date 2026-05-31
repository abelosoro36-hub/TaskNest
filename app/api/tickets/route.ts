import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, Model } from "mongoose";
 
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string, { bufferCommands:false });
}
 
interface ITicket { user:mongoose.Types.ObjectId; subject:string; message:string; category:string; priority:string; status:string; agent:string; replies:{ from:string; message:string; createdAt:Date }[]; }
const TicketSchema = new Schema<ITicket>({
  user:     { type:Schema.Types.ObjectId, ref:"User", required:true },
  subject:  { type:String, required:true },
  message:  { type:String, required:true },
  category: { type:String, default:"General" },
  priority: { type:String, enum:["Low","Medium","High"],                    default:"Medium" },
  status:   { type:String, enum:["Open","In Progress","Resolved","Closed"], default:"Open"   },
  agent:    { type:String, default:"Unassigned" },
  replies:  [{ from:{ type:String }, message:{ type:String }, createdAt:{ type:Date, default:Date.now } }],
}, { timestamps:true });
const Ticket: Model<ITicket> = mongoose.models.Ticket ?? mongoose.model<ITicket>("Ticket", TicketSchema);
 
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const filter: Record<string,unknown> = {};
    const status   = searchParams.get("status");
    const priority = searchParams.get("priority");
    const page     = parseInt(searchParams.get("page")  ?? "1");
    const limit    = parseInt(searchParams.get("limit") ?? "20");
    if (status)   filter.status   = status;
    if (priority) filter.priority = priority;
    const [tickets, total] = await Promise.all([
      Ticket.find(filter).populate("user","firstName lastName email").sort({ createdAt:-1 }).skip((page-1)*limit).limit(limit).lean(),
      Ticket.countDocuments(filter),
    ]);
    return NextResponse.json({ success:true, data:tickets, meta:{ total, page, limit } });
  } catch(err) {
    console.error("[GET /api/tickets]", err);
    return NextResponse.json({ success:false, error:"Failed to fetch tickets" }, { status:500 });
  }
}
 
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, subject, message, category="General", priority="Medium" } = await req.json();
    if (!userId || !subject || !message)
      return NextResponse.json({ success:false, error:"userId, subject, message required" }, { status:400 });
    const ticket = await Ticket.create({ user:userId, subject, message, category, priority });
    return NextResponse.json({ success:true, data:ticket }, { status:201 });
  } catch(err) {
    console.error("[POST /api/tickets]", err);
    return NextResponse.json({ success:false, error:"Failed to create ticket" }, { status:500 });
  }
}