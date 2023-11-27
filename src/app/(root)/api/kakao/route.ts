import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const nextResponse = NextResponse.redirect(
      new URL(`${searchParams.get("state") ?? "/"}`, request.url),
    );

    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded;charset=utf-8";

    const resToken = await axios.post("https://kauth.kakao.com/oauth/token", {
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      redirect_uri: `${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`,
      code: searchParams.get("code")!,
    });

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${resToken.data.access_token}`;

    const resMe = await axios.get("https://kapi.kakao.com/v2/user/me", {});

    nextResponse.cookies.set("kakao_test_token", resToken.data.access_token);

    nextResponse.cookies.set(
      "hong_user_nickname",
      resMe.data.kakao_account.profile.nickname,
    );

    nextResponse.cookies.set(
      "hong_user_thumbnail",
      resMe.data.kakao_account.profile.thumbnail_image_url ?? "",
    );

    return nextResponse;
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL(`/`, request.url));
  }
}
