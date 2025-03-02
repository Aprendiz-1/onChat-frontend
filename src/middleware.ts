import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('user@token')?.value;

    const publicRoutes = ['/', '/register'];
    const protectedRoutes = ['/chats'];

    const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
    const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);

    if(token && isPublicRoute) {
        return NextResponse.redirect(new URL('/chats', request.url));
    }

    if(!token && isProtectedRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/register', '/chats/:path*',],
};