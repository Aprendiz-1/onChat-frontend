import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const cookie = await cookies();
    const token = cookie.get('user@token')?.value;

    const protectedRoutes = ['/chats'];
    const isProtectedRoutes = protectedRoutes.includes(request.nextUrl.pathname);

    if(!isProtectedRoutes && token) {
        return NextResponse.redirect(new URL('/chats', request.url));
    }

    if(isProtectedRoutes && !token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/chats/:path*',],
};