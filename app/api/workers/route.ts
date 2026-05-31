import { NextRequest, NextResponse } from "next/server";
import mongoose, { Schema, Model } from "mongoose";
 
/* ── DB connection ── */
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI as string, { bufferCommands: false });
}
 
/* ── User model ── */
interface IUser { firstName:string; lastName:string; email:string; passwordHash:string; plan:string; role:string; country:string; isVerified:boolean; verificationStatus:string; twoFAEnabled:boolean; qualificationLevel:string; completedModules:number[]; totalEarnings:number; pendingBalance:number; accuracy:number; tasksCompleted:number; streak:number; tier:string; payoutMethod:string; payoutAccount:string; }
const UserSchema = new Schema<IUser>({
  firstName:   { type:String, required:true, trim:true },
  lastName:    { type:String, required:true, trim:true },
  email:       { type:String, required:true, unique:true, lowercase:true, trim:true },
  passwordHash:{ type:String, required:true },
  plan:        { type:String, enum:["free","basic","premium"],  default:"free"     },
  role:        { type:String, enum:["worker","admin"],          default:"worker"   },
  country:     { type:String, default:"" },
  isVerified:          { type:Boolean, default:false },
  verificationStatus:  { type:String,  default:"pending" },
  twoFAEnabled:        { type:Boolean, default:false },
  qualificationLevel:  { type:String,  default:"beginner" },
  completedModules:    [{ type:Number }],
  totalEarnings:  { type:Number, default:0 },
  pendingBalance: { type:Number, default:0 },
  accuracy:       { type:Number, default:0 },
  tasksCompleted: { type:Number, default:0 },
  streak:         { type:Number, default:0 },
  tier:           { type:String, default:"Standard" },
  payoutMethod:   { type:String, default:"paypal" },
  payoutAccount:  { type:String, default:"" },
}, { timestamps:true });
const User: Model<IUser> = mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);
 
/* ── Handlers ── */
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const filter: Record<string,unknown> = { role:"worker" };
    const plan  = searchParams.get("plan");
    const tier  = searchParams.get("tier");
    const veri  = searchParams.get("verified");
    const page  = parseInt(searchParams.get("page")  ?? "1");
    const limit = parseInt(searchParams.get("limit") ?? "20");
    if (plan) filter.plan = plan;
    if (tier) filter.tier = tier;
    if (veri !== null) filter.isVerified = veri === "true";
    const [workers, total] = await Promise.all([
      User.find(filter).select("-passwordHash").sort({ createdAt:-1 }).skip((page-1)*limit).limit(limit).lean(),
      User.countDocuments(filter),
    ]);
    return NextResponse.json({ success:true, data:workers, meta:{ total, page, limit } });
  } catch(err) {
    console.error("[GET /api/workers]", err);
    return NextResponse.json({ success:false, error:"Failed to fetch workers" }, { status:500 });
  }
}
 
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { firstName, lastName, email, plan="free", country="" } = await req.json();
    if (!firstName || !lastName || !email)
      return NextResponse.json({ success:false, error:"firstName, lastName, email required" }, { status:400 });
    if (await User.findOne({ email: email.toLowerCase() }))
      return NextResponse.json({ success:false, error:"Email already registered" }, { status:409 });
    const w = await User.create({ firstName, lastName, email:email.toLowerCase(), passwordHash:"pending", plan, country });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash:_pw, ...safe } = w.toObject();
    return NextResponse.json({ success:true, data:safe }, { status:201 });
  } catch(err) {
    console.error("[POST /api/workers]", err);
    return NextResponse.json({ success:false, error:"Failed to create worker" }, { status:500 });
  }
}