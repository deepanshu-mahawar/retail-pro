import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/dashboard"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const publicOnlyRoutes = ["/signin", "/signup", "/verification"];

  const isPublicOnlyRoute = publicOnlyRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isPublicOnlyRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
