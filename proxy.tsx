import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const accessToken = request.cookies.get("accessToken")?.value;

    const isProtected = pathname.startsWith("/dashboard");
    const isAuthPage = 
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

    if (isProtected && !accessToken) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (isAuthPage && accessToken) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher: [
        "/dashboard/:path*",
    ],
}