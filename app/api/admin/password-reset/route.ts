import { NextRequest, NextResponse } from "next/server";
import { ApiResponseData, tryOperation, UnauthorizedException } from "../../exception-filter";
import { ResetPasswordDto, validatePasswordReset } from "@/app/models/user";
import { Contract, Validation } from "@/lib/contracts";
import connectDB from "@/lib/mongose-client";
import { loadAdminCookie } from "@/lib/server-functions";
import { compareSync, genSaltSync, hashSync } from "bcrypt";
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
    let match = compareSync(payload.oldPassword!, user!.password);
    let newPasswordMatch = compareSync(payload.newPassword!, user!.password);
    Validation.requires(match, "Incorrect username-password combination");
    Validation.requires(!newPasswordMatch, "New password cannot be the same as old password");
    let salt = genSaltSync(20);
    let newPassword = hashSync(payload.newPassword!, salt);
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
