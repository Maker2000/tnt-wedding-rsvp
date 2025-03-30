"use server";
import { CookieKey } from "@/app/models/enums";
import { AuthUser, decodeToken } from "@/secrets";
import { cookies } from "next/headers";

export const saveAdminCookie = async (token?: string | null) => {
  if (token) {
    const cookieData = await cookies();
    cookieData.set(CookieKey.adminToken, token);
  }
};
export const loadAdminCookie = async (): Promise<AuthUser | undefined> => {
  const cookieData = await cookies();
  const token = cookieData.get(CookieKey.adminToken)?.value;
  if (!token) return undefined;
  const user = decodeToken(token);
  return user;
};
export const loadGuestCookie = async (): Promise<AuthUser | undefined> => {
  const cookieData = await cookies();
  const token = cookieData.get(CookieKey.guestToken)?.value;
  if (!token) return undefined;
  const user = decodeToken(token);
  return user;
};

export const saveGuestCookie = async (token?: string | null) => {
  if (token) {
    const cookieData = await cookies();
    const oneDay = 24 * 60 * 60 * 1000;
    cookieData.set(CookieKey.guestToken, token, { expires: Date.now() + oneDay });
  }
};

export const getGuestTokenFromRequest = async (): Promise<string | undefined> => {
  const cookieData = await cookies();
  return cookieData.get(CookieKey.guestToken)?.value;
};
export const logout = async (): Promise<void> => {
  const cookieData = await cookies();
  cookieData.delete(CookieKey.guestToken);
  cookieData.delete(CookieKey.adminToken);
};
