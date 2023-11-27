import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const nextResponse = NextResponse.redirect(new URL(`/`, request.url));

    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded;charset=utf-8";

    const resToken = await axios.post("https://nid.naver.com/oauth2.0/token", {
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
      // redirect_uri: `${process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI}`,
      code: searchParams.get("code")!,
    });

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${resToken.data.access_token}`;

    const resMe = await axios.get("https://openapi.naver.com/v1/nid/me", {});

    nextResponse.cookies.set(
      "hong_user_nickname",
      resMe.data.response.nickname,
    );

    nextResponse.cookies.set(
      "hong_user_thumbnail",
      resMe.data.response.profile_image ?? "",
    );

    return nextResponse;
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL(`/`, request.url));
  }
}
