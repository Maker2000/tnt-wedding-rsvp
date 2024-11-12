import { CreateGuestDto, GuestQrUrlResponse } from "@/app/models/guest";
import { ClientException, tryOperation } from "../../exception-filter";
import connectDB from "@/lib/mongose-client";
import { encodeToken } from "@/secrets";
import { CookieKey, UserType } from "@/app/models/enums";
import { NextRequest, NextResponse } from "next/server";
import { Contract, Validation } from "@/lib/contracts";
import { Guest } from "@/app/models/guest.mongoose";

export async function POST(req: NextRequest, res: NextResponse) {
  return await tryOperation(async () => {
    let payload: CreateGuestDto = await req.json();
    Contract.requireNotNull(payload, "Data to create guest QR is required");
    await connectDB();
    let existingGuest = await Guest.findOne({ firstName: payload.firstName, lastName: payload.lastName });
    Validation.requireNull(existingGuest, "Guest already exists");
    let guest = await Guest.create(payload);
    let res = NextResponse.json(<GuestQrUrlResponse>{ url: `${req.headers.get("origin")}/register-guest?token=${guest!.id}` });
    return res;
  });
}
