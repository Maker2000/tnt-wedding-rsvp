import connectDB from "@/lib/mongose-client";
import { GuestQrUrlResponse } from "@/app/models/guest";
import { NextRequest, NextResponse } from "next/server";
import { ClientException, tryOperation } from "@/app/api/exception-filter";
import { Contract, Validation } from "@/lib/contracts";
import { Guest } from "@/app/models/guest.mongoose";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<NextResponse> {
  return await tryOperation(async () => {
    await connectDB();
    const id = (await params).id;
    Contract.requireNotNull(id, "The id of the guest is required.");
    let guest = await Guest.findById(id);
    Validation.requireEntityFound(guest, "Guest");
    let res = NextResponse.json(<GuestQrUrlResponse>{ url: `${req.headers.get("origin")}/register-guest?token=${guest!.id}` });
    return res;
  });
}
