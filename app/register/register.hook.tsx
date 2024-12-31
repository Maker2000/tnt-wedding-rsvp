import { HttpClient } from "@/lib/http-client";
import { getGuestTokenFromRequest, saveGuestCookie } from "@/lib/server-functions";
import { AuthUser } from "@/secrets";
import { redirect, RedirectType } from "next/navigation";
import { CookieKey } from "../models/enums";

export const useRegisterHook = () => {
  const validateToken = async (): Promise<string> => {
    let token = await getGuestTokenFromRequest();
    if (token) {
      let res = await HttpClient.postData<AuthUser, string>("/api/guest/verify", token, async (headers) => {
        await saveGuestCookie(headers.get(CookieKey.guestToken));
      });
      if (res.hasError()) return res.error!.message;
      redirect("/register/welcome", RedirectType.replace);
    }
    return "You are unauthorized";
  };
  return { validateToken };
};
