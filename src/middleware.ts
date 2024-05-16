import { NextRequest, NextResponse } from "next/server";
import { CURRENT_MODE, MODES } from "./utils/constants";
const protectedRoutes = ["/request/preview", "/request/recent"];

export default function middleware(req: NextRequest, res: NextResponse) {
  if (
    CURRENT_MODE === MODES.PILOT &&
    protectedRoutes.includes(req.nextUrl.pathname)
  ) {
    const absoluteURL = new URL("/request/results", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (req.nextUrl.pathname === "/") {
    const absoluteURL = new URL("/request", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (CURRENT_MODE === MODES.DEMO) {
    return;
  }
}
