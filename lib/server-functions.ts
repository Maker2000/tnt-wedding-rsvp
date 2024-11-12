"use server";
import { CookieKey } from "@/app/models/enums";
import { AuthUser, decodeToken } from "@/secrets";
import { cookies } from "next/headers";

export const saveAdminCookie = async (token?: string | null) => {
  if (token) {
    let cookieData = await cookies();
    cookieData.set(CookieKey.adminToken, token);
  }
};
export const loadAdminCookie = async (): Promise<AuthUser | undefined> => {
  let cookieData = await cookies();
  let token = cookieData.get(CookieKey.adminToken)?.value;
  if (!token) return undefined;
  let user = decodeToken(token);
  return user;
};
export const loadGuestCookie = async (): Promise<AuthUser | undefined> => {
  let cookieData = await cookies();
  let token = cookieData.get(CookieKey.guestToken)?.value;
  if (!token) return undefined;
  let user = decodeToken(token);
  return user;
};

export const saveGuestCookie = async (token?: string | null) => {
  if (token) {
    let cookieData = await cookies();
    const oneDay = 24 * 60 * 60 * 1000;
    cookieData.set(CookieKey.guestToken, token, { expires: Date.now() + oneDay });
  }
};

export const getGuestTokenFromRequest = async (): Promise<string | undefined> => {
  let cookieData = await cookies();
  return cookieData.get(CookieKey.guestToken)?.value;
};
export const logout = async (): Promise<void> => {
  let cookieData = await cookies();
  cookieData.delete(CookieKey.guestToken);
  cookieData.delete(CookieKey.adminToken);
};
