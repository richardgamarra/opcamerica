import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const VALID_LANGS = ["en", "es"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-page paths and admin area
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Already has valid lang prefix
  const langSegment = pathname.split("/")[1];
  if (VALID_LANGS.includes(langSegment)) {
    return NextResponse.next();
  }

  // Check cookie for saved preference
  const cookieLang = request.cookies.get("lang")?.value;
  const lang = cookieLang && VALID_LANGS.includes(cookieLang) ? cookieLang : "en";

  return NextResponse.redirect(new URL(`/${lang}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|images|favicon.ico).*)"],
};
