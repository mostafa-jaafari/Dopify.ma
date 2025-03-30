import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";
import { auth } from "./auth";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const IsAuth = await auth();

    const ProtectedRoutes = ['/seller', '/seller/:path*'];
    const IsProtectedRoute = ProtectedRoutes.some(route => pathname.startsWith(route));

    const EnabledRoutes = ['/auth']
    const IsHideRoutes = EnabledRoutes.some(route => pathname.startsWith(route));

    if (!IsAuth && IsProtectedRoute) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    if (IsHideRoutes && IsAuth) {
        return NextResponse.redirect(new URL('/seller', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/seller', '/seller/:path*', '/auth/login', '/auth/register']
}