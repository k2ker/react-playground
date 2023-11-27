import { NextRequest, NextResponse } from "next/server";

export const kakaoMiddleware = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    // 토큰 요청
    const tokenResponse = await fetch(`https://kauth.kakao.com/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        code: code || "",
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "",
        client_secret: process.env.KAKAO_CLIENT_SECRET || "",
        redirect_uri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}` || "",
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 사용자 정보 요청
    const userInfoResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const userInfo = await userInfoResponse.json();

    // 응답 및 쿠키 설정
    const nextResponse = NextResponse.redirect(new URL(`/`, request.url));
    nextResponse.cookies.set(
      "hong_user_nickname",
      userInfo.kakao_account.profile.nickname,
    );
    nextResponse.cookies.set(
      "hong_user_thumbnail",
      userInfo.kakao_account.profile.thumbnail_image_url ?? "",
    );

    return nextResponse;
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL(`/`, request.url));
  }
};
