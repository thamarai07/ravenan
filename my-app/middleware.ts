import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // Redirect to login if no token is found
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next(); // Allow request to proceed
}

// Apply middleware only to protected routes
export const config = {
  matcher: ["/dashboard/:path*", "/protected/:path*"], // Define routes for middleware
};
