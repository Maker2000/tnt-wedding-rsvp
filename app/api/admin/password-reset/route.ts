import { NextRequest, NextResponse } from "next/server";
import { ApiResponseData, tryOperation, UnauthorizedException } from "../../exception-filter";
import { ResetPasswordDto, validatePasswordReset } from "@/app/models/user";
import { Contract, Validation } from "@/lib/contracts";
import connectDB from "@/lib/mongose-client";
import { cookies } from "next/headers";
import { getGuestTokenFromRequest, loadAdminCookie } from "@/lib/server-functions";
import { compare, genSalt, hash } from "bcrypt";
import { User } from "@/app/models/user.mongoose";

export async function PUT(req: NextRequest) {
  return await tryOperation(async () => {
    let payload: ResetPasswordDto = await req.json();
    Contract.requireNotNull(payload, "Reset password data is required.");
    validatePasswordReset(payload);
    let contextUser = await loadAdminCookie();
    if (!contextUser) throw new UnauthorizedException();
    await connectDB();
    let user = await User.findById(contextUser.id);
    Validation.requireNotNull(user, "Incorrect username-password combination");
    console.log(user);
    let match = await compare(payload.oldPassword!, user!.password);
    let newPasswordMatch = await compare(payload.newPassword!, user!.password);
    Validation.requires(match, "Incorrect username-password combination");
    Validation.requires(!newPasswordMatch, "New password cannot be the same as old password");
    let salt = await genSalt(20);
    let newPassword = await hash(payload.newPassword!, salt);
    let newUser = await User.updateOne(
      { _id: user!._id },
      {
        $set: {
          password: newPassword,
        },
      }
    );
    Validation.requires(newUser.acknowledged && newUser.upsertedCount > 0, "Failed to change your password. Try again later");
    let res = NextResponse.json(new ApiResponseData("Success"), { status: 200 });
    return res;
  });
}
