import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, Model } from "mongoose";
 
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string, { bufferCommands:false });
}
 
interface IPayment { worker:mongoose.Types.ObjectId; task:mongoose.Types.ObjectId|null; type:string; amount:number; currency:string; method:string; status:string; reference:string; note:string; }
const PaymentSchema = new Schema<IPayment>({
  worker:    { type:Schema.Types.ObjectId, ref:"User", required:true },
  task:      { type:Schema.Types.ObjectId, ref:"Task", default:null },
  type:      { type:String, enum:["earning","payout","refund","subscription"], required:true },
  amount:    { type:Number, required:true },
  currency:  { type:String, default:"USD" },
  method:    { type:String, default:"paypal" },
  status:    { type:String, enum:["pending","processing","paid","failed"], default:"pending" },
  reference: { type:String, default:"" },
  note:      { type:String, default:"" },
}, { timestamps:true });
const Payment: Model<IPayment> = mongoose.models.Payment ?? mongoose.model<IPayment>("Payment", PaymentSchema);
 
const UserSchema = new Schema({}, { strict:false });
const UserM: Model<mongoose.Document> = mongoose.models.User ?? mongoose.model("User", UserSchema);
 
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const filter: Record<string,unknown> = {};
    const workerId = searchParams.get("worker");
    const status   = searchParams.get("status");
    const type     = searchParams.get("type");
    const page     = parseInt(searchParams.get("page")  ?? "1");
    const limit    = parseInt(searchParams.get("limit") ?? "20");
    if (workerId) filter.worker = workerId;
    if (status)   filter.status = status;
    if (type)     filter.type   = type;
    const [payments, total] = await Promise.all([
      Payment.find(filter).populate("worker","firstName lastName email").populate("task","title category").sort({ createdAt:-1 }).skip((page-1)*limit).limit(limit).lean(),
      Payment.countDocuments(filter),
    ]);
    return NextResponse.json({ success:true, data:payments, meta:{ total, page, limit } });
  } catch(err) {
    console.error("[GET /api/payments]", err);
    return NextResponse.json({ success:false, error:"Failed to fetch payments" }, { status:500 });
  }
}
 
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { workerId, amount, method } = await req.json();
    if (!workerId || !amount || !method)
      return NextResponse.json({ success:false, error:"workerId, amount, method required" }, { status:400 });
    if (amount < 10)
      return NextResponse.json({ success:false, error:"Minimum payout is $10" }, { status:400 });
    const worker = await UserM.findById(workerId) as { pendingBalance:number } | null;
    if (!worker) return NextResponse.json({ success:false, error:"Worker not found" }, { status:404 });
    if (worker.pendingBalance < amount)
      return NextResponse.json({ success:false, error:"Insufficient balance" }, { status:400 });
    const [payment] = await Promise.all([
      Payment.create({ worker:workerId, task:null, type:"payout", amount, method, status:"pending", reference:`PAY-${Date.now()}` }),
      UserM.findByIdAndUpdate(workerId, { $inc:{ pendingBalance:-amount } }),
    ]);
    return NextResponse.json({ success:true, data:payment }, { status:201 });
  } catch(err) {
    console.error("[POST /api/payments]", err);
    return NextResponse.json({ success:false, error:"Failed to create payout" }, { status:500 });
  }
}