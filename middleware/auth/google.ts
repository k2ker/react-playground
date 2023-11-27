import { NextRequest, NextResponse } from "next/server";

export const googleMiddleware = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    const tokenResponse = await fetch(`https://oauth2.googleapis.com/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        code: code || "",
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "",
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const userInfo = await userInfoResponse.json();

    // 응답 및 쿠키 설정
    const nextResponse = NextResponse.redirect(new URL(`/`, request.url));
    nextResponse.cookies.set("hong_user_nickname", userInfo.name);
    nextResponse.cookies.set("hong_user_thumbnail", userInfo.picture ?? "");

    return nextResponse;
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL(`/`, request.url));
  }
};
