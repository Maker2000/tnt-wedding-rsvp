"use server";
import { NextRequest, NextResponse } from "next/server";
import { CookieKey } from "./app/models/enums";
import { decodeToken } from "./secrets";

export const config = {
  matcher: ["/((?!api/admin/login|api/guest/verify|_next/static|_next/image|favicon.ico).*)"],
};
const validateToken = async (req: NextRequest, keyReference: string, backupReference?: string): Promise<NextResponse> => {
  let decodedToken = await decodeToken(req.cookies.get(keyReference)?.value);
  if (!decodedToken) {
    if (backupReference) {
      let backupToken = await decodeToken(req.cookies.get(backupReference)?.value);
      if (!backupToken) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      return NextResponse.next();
    }
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.next();
};

export async function middleware(req: NextRequest): Promise<NextResponse> {
  if (req.nextUrl.pathname.match("api/admin") || req.nextUrl.pathname.match("api/time-record")) {
    try {
      return validateToken(req, CookieKey.adminToken);
    } catch (error) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
  if (req.nextUrl.pathname.match("api/guest")) {
    try {
      return validateToken(req, CookieKey.guestToken, CookieKey.adminToken);
    } catch (error) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  }
  if (req.nextUrl.pathname.match("/reservation")) {
    try {
      let token = await decodeToken(req.cookies.get(CookieKey.guestToken)?.value);
      if (!token) return NextResponse.redirect(new URL("/", req.url));
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (req.nextUrl.pathname.match("/admin") || req.nextUrl.pathname.match("/time-record")) {
    let decodedToken = await decodeToken(req.cookies.get(CookieKey.adminToken)?.value);
    if (!decodedToken) {
      // preserve the originally requested path (including search) so the login page can redirect after auth
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("next", req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }
  if (req.nextUrl.pathname.endsWith("/login")) {
    let decodedToken = await decodeToken(req.cookies.get(CookieKey.adminToken)?.value);
    if (!decodedToken) return NextResponse.next();
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }
  if (req.nextUrl.pathname.endsWith("/register-guest")) {
    let registerToken = Object.fromEntries(req.nextUrl.searchParams);
    const newHeaders = new Headers(req.headers);
    newHeaders.append(CookieKey.guestToken, registerToken.token);
    let res = NextResponse.redirect(new URL("/register", req.url), { headers: newHeaders });
    res.cookies.set(CookieKey.guestToken, registerToken.token);
    return res;
  }

  return NextResponse.next();
}
