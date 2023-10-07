import { NextRequest, NextResponse } from "next/server";

const TOKEN_NAME = "hong_access_token";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/social")) {
    if (request.nextUrl.searchParams.get("token")) {
      const token = request.nextUrl.searchParams.get("token")!;
      const redirect = request.nextUrl.searchParams.get("redirect") ?? "/";
      const response = NextResponse.redirect(new URL(redirect, request.url));

      response.cookies.set(TOKEN_NAME, token);

      return response;
    }
  }

  if (request.nextUrl.pathname.startsWith("/mypage")) {
    if (!request.cookies.has(TOKEN_NAME)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/social/:path*", "/mypage/:path*"],
};

//{BASE_URL}/social?token={TOKEN}&expires={EXPIRES}&redirect={REDIRECT}
//http://localhost:4000/social?token=TTTTOOOOKKKKEEEENNNN&expires=2023-10-09T00:00:00Z&redirect=/
