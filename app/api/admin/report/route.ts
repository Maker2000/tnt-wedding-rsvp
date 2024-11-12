import connectDB from "@/lib/mongose-client";
import { NextRequest, NextResponse } from "next/server";
import { tryOperation } from "../../exception-filter";
import { DashboardReport } from "@/app/models/reports";
import { Guest } from "@/app/models/guest.mongoose";

export async function GET(): Promise<NextResponse> {
  return await tryOperation(async () => {
    await connectDB();
    let guest = await Guest.aggregate<DashboardReport>([
      {
        $facet: {
          totalGuests: [{ $count: "totalGuests" }],
          reservedGuests: [
            {
              $match: {
                reserved: { $eq: true },
              },
            },
            { $count: "reservedGuests" },
          ],
        },
      },
      {
        $project: {
          totalGuests: {
            $arrayElemAt: ["$totalGuests.totalGuests", 0],
          },
          reservedGuests: {
            $arrayElemAt: ["$reservedGuests.reservedGuests", 0],
          },
        },
      },
    ]);
    console.log(guest);
    let res = NextResponse.json(guest[0]);
    return res;
  });
}
