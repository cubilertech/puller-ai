import { NextRequest, NextResponse } from "next/server";
import { isDemoMode, isPilotMode } from "./utils/constants";
const protectedRoutes = ["/request/preview", "/request/recent"];
const protectedRoutes2 = ["/request/recent"];

export default function middleware(req: NextRequest, res: NextResponse) {
  if (isPilotMode && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/request/results", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (isDemoMode && protectedRoutes2.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/request/results", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (req.nextUrl.pathname === "/") {
    const absoluteURL = new URL("/request", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (isDemoMode) {
    return;
  }
}
