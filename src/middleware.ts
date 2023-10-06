import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.searchParams.get("token") &&
    request.nextUrl.searchParams.get("expires")
  ) {
    const token = request.nextUrl.searchParams.get("token")!;
    const expires = request.nextUrl.searchParams.get("expires")!;
    const redirect = request.nextUrl.searchParams.get("redirect") ?? "/";
    const response = NextResponse.redirect(new URL(redirect, request.url));

    response.cookies.set("hong_access_token", token, {
      expires: new Date(expires),
    });

    return response;
  }
}

export const config = {
  matcher: "/social/:path*",
};

//{BASE_URL}/social?token={TOKEN}&expires={EXPIRES}&redirect={REDIRECT}
//http://localhost:4000/social?token=TTTTOOOOKKKKEEEENNNN&expires=2023-10-09T00:00:00Z&redirect=home
