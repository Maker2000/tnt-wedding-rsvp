import connectDB from "@/lib/mongose-client";
import { ApiResponseData, ClientException, tryOperation } from "../../exception-filter";
import { IGuest } from "@/app/models/guest";
import { NextRequest, NextResponse } from "next/server";
import { Contract, Validation } from "@/lib/contracts";
import { Guest } from "@/app/models/guest.mongoose";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryOperation(async () => {
    await connectDB();
    const id = (await params).id;
    let res = await Guest.findById(id);
    Validation.requireEntityFound(res, "Guest");
    return NextResponse.json(res);
  });
}
export async function PUT(req: NextRequest): Promise<NextResponse> {
  return tryOperation(async () => {
    await connectDB();
    let guest: IGuest = await req.json();
    Contract.requireNotNull(guest, "Data to update guest is required");
    let res = await Guest.findOneAndUpdate({ _id: guest.id }, guest!);
    Validation.requireNotNull(res, "Failed to update your user, try again");
    console.log("Updated guest", res);
    return NextResponse.json(res);
  });
}
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryOperation(async () => {
    await connectDB();
    const id = (await params).id;
    let res = await Guest.deleteOne({ _id: id });
    Validation.requires(res.acknowledged, "Failed to delete guest");
    return NextResponse.json(res.deletedCount);
  });
}
