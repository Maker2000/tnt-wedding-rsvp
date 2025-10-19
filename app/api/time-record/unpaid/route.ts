import { NextResponse } from "next/server";
import { tryOperation, NotFoundException } from "../../exception-filter";
import connectDB from "@/lib/mongose-client";
import { TimeRecord } from "@/app/models/time-record.mongoose";

export async function GET(): Promise<NextResponse> {
  return tryOperation(async () => {
    await connectDB();
    const unpaid = await TimeRecord.find({ paid: false, clockOutTime: { $exists: true } });
    // Use MongoDB aggregation to sum (clockOutTime - clockInTime) across unpaid records
    // This delegates the calculation to the DB and avoids pulling all records into JS memory
    const agg = await TimeRecord.aggregate([
      { $match: { paid: false, clockOutTime: { $exists: true }, clockInTime: { $exists: true } } },
      {
        $project: {
          diffMs: { $subtract: ["$clockOutTime", "$clockInTime"] },
        },
      },
      {
        $group: {
          _id: null,
          totalMs: { $sum: "$diffMs" },
        },
      },
    ]);

    const totalMs = agg && agg.length > 0 && agg[0].totalMs ? agg[0].totalMs : 0;
    const totalHours = totalMs / 3600000; // ms -> hours (float)
    return NextResponse.json({ totalHours });
  });
}
