import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
const protectedRoutes = ["/dashboard"];

export default function middleware(req: NextRequest) {
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (req.nextUrl.pathname === "/") {
    const absoluteURL = new URL("/dashboard", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
