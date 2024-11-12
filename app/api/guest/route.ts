import connectDB from "@/lib/mongose-client";
import { tryOperation, UnauthorizedException } from "../exception-filter";
import { NextRequest, NextResponse } from "next/server";
import { Guest } from "@/app/models/guest.mongoose";

export async function GET(): Promise<NextResponse> {
  return tryOperation(async () => {
    await connectDB();
    let res = await Guest.find();
    return NextResponse.json(res);
  });
}
