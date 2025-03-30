import { base64url, JWTPayload, jwtVerify, SignJWT } from "jose";
import { UserType } from "./app/models/enums";

export const decodeToken = async (data?: string): Promise<AuthUser | undefined> => {
  if (data) {
    try {
      let { payload } = await jwtVerify<AuthUser>(data!, base64url.decode(process.env.JWT_SECRET!));
      return payload;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
  return undefined;
};
export const encodeToken = async (data: AuthUser): Promise<string> => {
  var res = await new SignJWT(data).setProtectedHeader({ alg: "HS256" }).sign(base64url.decode(process.env.JWT_SECRET!));
  return res;
};
export interface AuthUser extends JWTPayload {
  username?: string;
  id: string;
  userType: UserType;
}
