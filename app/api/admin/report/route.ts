import connectDB from "@/lib/mongose-client";
import { NextRequest, NextResponse } from "next/server";
import { tryOperation } from "../../exception-filter";
import { DashboardReport } from "@/app/models/reports";
import { Guest, GuestDoc } from "@/app/models/guest.mongoose";
import { AttendanceResponse, ReservationType } from "@/app/models/enums";
import { FilterQuery } from "mongoose";
import { IGuest } from "@/app/models/guest";

export async function GET(): Promise<NextResponse> {
  return await tryOperation(async () => {
    await connectDB();
    let guest = await Guest.aggregate<DashboardReport>([
      {
        $facet: {
          totalGuests: [{ $count: "totalGuests" }],
          totalPlusOne: [
            {
              $match: <FilterQuery<IGuest>>{
                reservationType: { $eq: ReservationType.plusOne },
              },
            },
            { $count: "totalPlusOne" },
          ],
          declinedGuests: [
            {
              $match: {
                response: { $eq: AttendanceResponse.declined },
              },
            },
            { $count: "declinedGuests" },
          ],
          declinedPlusOne: [
            {
              $match: <FilterQuery<IGuest>>{
                reservationType: { $eq: ReservationType.plusOne },
                response: { $eq: AttendanceResponse.declined },
              },
            },
            { $count: "declinedPlusOne" },
          ],
          reservedGuests: [
            {
              $match: {
                response: { $eq: AttendanceResponse.attending },
              },
            },
            { $count: "reservedGuests" },
          ],
          reservedPlusOne: [
            {
              $match: <FilterQuery<IGuest>>{
                response: { $eq: AttendanceResponse.attending },
                reservationType: { $eq: ReservationType.plusOne },
                plusOne: { $exists: true, $ne: null },
              },
            },
            { $count: "reservedPlusOne" },
          ],
        },
      },
      {
        $project: {
          totalGuests: {
            $ifNull: [{ $arrayElemAt: ["$totalGuests.totalGuests", 0] }, 0],
          },
          totalPlusOne: {
            $ifNull: [{ $arrayElemAt: ["$totalPlusOne.totalPlusOne", 0] }, 0],
          },
          reservedGuests: {
            $ifNull: [{ $arrayElemAt: ["$reservedGuests.reservedGuests", 0] }, 0],
          },
          reservedPlusOne: {
            $ifNull: [{ $arrayElemAt: ["$reservedPlusOne.reservedPlusOne", 0] }, 0],
          },
          declinedGuests: {
            $ifNull: [{ $arrayElemAt: ["$declinedGuests.declinedGuests", 0] }, 0],
          },
          declinedPlusOne: {
            $ifNull: [{ $arrayElemAt: ["$declinedPlusOne.declinedPlusOne", 0] }, 0],
          },
        },
      },
    ]);
    let res = NextResponse.json(guest[0]);
    return res;
  });
}
