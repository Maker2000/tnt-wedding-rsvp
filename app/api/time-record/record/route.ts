import { NextResponse } from "next/server";
import { NotFoundException, tryOperation } from "../../exception-filter";
import connectDB from "@/lib/mongose-client";
import { TimeRecord } from "@/app/models/time-record.mongoose";
import { ITimeRecord } from "@/app/models/time-record";
import { Validation } from "@/lib/contracts";

export async function GET(): Promise<NextResponse> {
  return tryOperation(async () => {
    await connectDB();
    let res = await TimeRecord.findOne({
      clockOutTime: { $exists: false },
      clockInTime: { $exists: true, $ne: null },
    });
    if (!res) {
      throw new NotFoundException("Open time record");
    }
    return NextResponse.json(res);
  });
}

export async function PUT(request: Request): Promise<NextResponse> {
  return tryOperation(async () => {
    await connectDB();
    const body: ITimeRecord = await request.json().catch(() => ({}));
    // find the open time record
    let res = await TimeRecord.findOne({ _id: body.id });
    Validation.requireNotNull(res, "No open time record found");
    // accept either `checkOutTime` (previous) or `clockOutTime` (ITimeRecord payload)
    const candidate = body?.clockOutTime;
    const clockOut = candidate ? new Date(candidate) : new Date();
    res!.clockOutTime = clockOut;
    await res!.save();
    return NextResponse.json(res);
  });
}
