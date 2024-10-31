import { NextRequest, NextResponse } from "next/server";
import { isDemoMode, isPilotMode } from "./utils/constants";

const protectedRoutes = ["/request/preview", "/request/recent"];
const protectedRoutesWithoutToken = ["/request/preview", "/request/recent", "/request", "/request/:id"]
const protectedRoutes2 = ["/request/recent"];
const openRoutes = ["/", "/challenge"]; // Add your public routes here

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Handle Pilot Mode
  if (isPilotMode) {
    // Exclude static assets, Next.js internals, and public routes from the token check
    if (
      pathname.startsWith("/_next") || // Next.js internals
      pathname.startsWith("/api") ||
      pathname.startsWith("/public") || // Direct public folder access
      pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico)$/) // Allow specific file types
    ) {
      return NextResponse.next();
    }

    const token = req.cookies.get("token");

    // If token exists, redirect away from openRoutes
    if (token && openRoutes.includes(pathname)) {
      const absoluteURL = new URL("/request", req.nextUrl.origin); // Redirect to the dashboard or a different route
      return NextResponse.redirect(absoluteURL.toString());
    }

    // Redirect to login page if no token is found and the route is protected
    if (!token?.value && !openRoutes.includes(pathname)) {
      const absoluteURL = new URL("/", req.nextUrl.origin); // Redirect to homepage or login
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  // Handle Protected Routes
  if (isPilotMode && protectedRoutes.includes(pathname)) {
    const absoluteURL = new URL("/request/results", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Handle Demo Mode
  if (isDemoMode && protectedRoutes2.includes(pathname)) {
    const absoluteURL = new URL("/request/results", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  // Allow the request to proceed if no restrictions apply
  return NextResponse.next();
}
