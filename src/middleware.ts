import { NextResponse, type NextRequest } from "next/server";

const publicRoutes = ["/login", "/api/auth"];

export function middleware(request: NextRequest) {
  const isPublic = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
  const hasDummyToken = request.cookies.has("ray_pos_token");

  if (!isPublic && !hasDummyToken) {
    const login = new URL("/login", request.url);
    login.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js).*)"]
};
