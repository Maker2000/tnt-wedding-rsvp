import { NextRequest, NextResponse } from "next/server";
import { tryOperation, UnauthorizedException } from "../../exception-filter";
import { encodeToken } from "@/secrets";
import connectDB from "@/lib/mongose-client";
import { CookieKey, UserType } from "@/app/models/enums";
import { Guest } from "@/app/models/guest.mongoose";

export async function POST(req: NextRequest): Promise<NextResponse> {
  return await tryOperation(async () => {
    let bodyToken: string = await req.json();
    if (!bodyToken) throw new UnauthorizedException("Invalid url/token. Please contact the issuer of your invite for a new one.");
    await connectDB();
    let guest = await Guest.findById(bodyToken);
    if (guest) {
      let token = await encodeToken({ username: `${guest!.firstName.trim()}${guest!.lastName.trim()}`, id: guest!.id, userType: UserType.guest });
      let res = NextResponse.json({ message: "Success", data: token });
      res.headers.append(CookieKey.guestToken, token);
      return res;
    }
    throw new UnauthorizedException("Invalid url/token. Please contact the issuer of your invite for a new one.");
  });
}
