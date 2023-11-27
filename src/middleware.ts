import { request } from "http";
import { NextRequest, NextResponse } from "next/server";
import { googleMiddleware } from "../middleware/auth/google";
import { naverMiddleware } from "../middleware/auth/naver";
import { kakaoMiddleware } from "../middleware/auth/kakao";

const TOKEN_NAME = "hong_access_token";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/mypage")) {
    if (!request.cookies.has(TOKEN_NAME)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/auth/google")) {
    const nextResponse = await googleMiddleware(request);
    return nextResponse;
  }

  if (request.nextUrl.pathname.startsWith("/auth/naver")) {
    const nextResponse = await naverMiddleware(request);
    return nextResponse;
  }

  if (request.nextUrl.pathname.startsWith("/auth/kakao")) {
    const nextResponse = await kakaoMiddleware(request);
    return nextResponse;
  }
}

export const config = {
  matcher: ["/social/:path*", "/mypage/:path*", "/auth/:path*"],
};

//{BASE_URL}/social?token={TOKEN}&expires={EXPIRES}&redirect={REDIRECT}
//http://localhost:4000/social?token=TTTTOOOOKKKKEEEENNNN&expires=2023-10-09T00:00:00Z&redirect=/
