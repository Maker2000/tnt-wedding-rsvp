import { compare, genSalt } from "bcrypt";
import { ClientException, ServerException, tryOperation } from "../../exception-filter";
import connectDB from "@/lib/mongose-client";
import { LoginDto } from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import { AuthUser, encodeToken } from "@/secrets";
import { CookieKey, UserType } from "@/app/models/enums";
import { Contract, Validation } from "@/lib/contracts";
import { User } from "@/app/models/user.mongoose";

export async function POST(req: NextRequest) {
  return await tryOperation(async () => {
    let payload: LoginDto = await req.json();
    Contract.requireNotNull(payload, "Login data is required.");
    await connectDB();
    let user = await User.findOne({ email: payload.email });
    Validation.requireNotNull(user, "Incorrect username-password combination");
    let match = await compare(payload.password, user!.password);
    Validation.requires(match, "Incorrect username-password combination");
    let token = await encodeToken({ username: user!.username, id: user!.id, userType: UserType.admin });
    let res = NextResponse.json(user, {});
    res.headers.set(CookieKey.adminToken, token);
    return res;
  });
}
