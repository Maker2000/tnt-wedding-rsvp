import { NextRequest, NextResponse } from "next/server";
import { NotFoundException, tryOperation } from "../exception-filter";
import connectDB from "@/lib/mongose-client";
import { TimeRecord } from "@/app/models/time-record.mongoose";
import { CreateTimeRecordDto, ITimeRecord } from "@/app/models/time-record";
import { Contract, Validation } from "@/lib/contracts";

export async function GET(): Promise<NextResponse> {
  return tryOperation(async () => {
    await connectDB();
    let res = await TimeRecord.find(
      {
        clockOutTime: { $exists: true },
      },
      null,
      { sort: { clockInTime: 1 } }
    );
    return NextResponse.json(res);
  });
}

export async function POST(request: Request): Promise<NextResponse> {
  return tryOperation(async () => {
    await connectDB();
    let existingOpenTime = await TimeRecord.findOne({
      clockOutTime: { $exists: false },
    });
    Validation.requireNull(existingOpenTime, "Clock-in already exists");
    const body: CreateTimeRecordDto = await request.json();
    const record = await TimeRecord.create(body);
    return NextResponse.json(record);
  });
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  return tryOperation(async () => {
    await connectDB();
    let timeRecord: ITimeRecord = await req.json();
    Contract.requireNotNull(timeRecord, "Data to update time record is required");
    let res = await TimeRecord.findOneAndUpdate({ _id: timeRecord.id }, timeRecord!);
    Validation.requireNotNull(res, "Failed to update your user, try again");
    return NextResponse.json(res);
  });
}
