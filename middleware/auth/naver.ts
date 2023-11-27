import { NextRequest, NextResponse } from "next/server";

export const naverMiddleware = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    // 토큰 요청
    const tokenResponse = await fetch(`https://nid.naver.com/oauth2.0/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        code: code || "",
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
        client_secret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || "",
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 사용자 정보 요청
    const userInfoResponse = await fetch(
      "https://openapi.naver.com/v1/nid/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const userInfo = await userInfoResponse.json();

    // 응답 및 쿠키 설정
    const nextResponse = NextResponse.redirect(new URL(`/`, request.url));
    nextResponse.cookies.set("hong_user_nickname", userInfo.response.nickname);
    nextResponse.cookies.set(
      "hong_user_thumbnail",
      userInfo.response.profile_image ?? "",
    );

    return nextResponse;
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL(`/`, request.url));
  }
};
