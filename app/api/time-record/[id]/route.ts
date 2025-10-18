import connectDB from "@/lib/mongose-client";
import { NextRequest, NextResponse } from "next/server";
import { tryOperation } from "../../exception-filter";
import { Contract, Validation } from "@/lib/contracts";
import { ITimeRecord } from "@/app/models/time-record";
import { TimeRecord } from "@/app/models/time-record.mongoose";

// export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
//   return tryOperation(async () => {
//     await connectDB();
//     const id = (await params).id;
//     let res = await Guest.findById(id);
//     Validation.requireEntityFound(res, "Guest");
//     return NextResponse.json(res);
//   });
// }
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryOperation(async () => {
    await connectDB();
    const id = (await params).id;
    let timeRecord: ITimeRecord = await req.json();
    Contract.requireNotNull(timeRecord, "Data to update time record is required");
    let res = await TimeRecord.findOneAndUpdate({ _id: id }, timeRecord!, { new: true });
    Validation.requireNotNull(res, "Failed to update your time record, try again");
    console.log("Updated time record", res);
    return NextResponse.json(res);
  });
}
