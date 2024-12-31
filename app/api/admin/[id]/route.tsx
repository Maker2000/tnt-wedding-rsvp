import { User } from "@/app/models/user.mongoose";
import "@/app/models/guest.mongoose";
import { tryOperation } from "../../exception-filter";
import connectDB from "@/lib/mongose-client";
import { Contract, Validation } from "@/lib/contracts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return tryOperation(async () => {
    Contract.requireNotNull((await params).id, "User id required");
    await connectDB();
    const id = (await params).id;
    let res = await User.findById(id).populate([
      { path: "adminMessages.from", model: "User", select: ["firstName", "lastName", "_id", "username"] },
      { path: "guestMessages.from", model: "Guest", select: ["firstName", "lastName", "_id"] },
    ]);
    Validation.requireEntityFound(res, "User");
    return NextResponse.json(res);
  });
}
