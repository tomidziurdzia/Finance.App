import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");
  const { pathname } = request.nextUrl;

  if (!authToken && pathname === "/") {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (authToken && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/expenses/:path*", "/income/:path*"],
};
