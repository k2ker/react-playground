import axios from "axios";
import { NextResponse } from "next/server";

async function Proxy(request: Request) {
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
      redirect_uri: `${process.env.NEXT_PUBLIC_BASE_PATH}/api/proxy`,
      code: searchParams.get("code")!,
    });

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${resToken.data.access_token}`;

    const resMe = await axios.get("https://kapi.kakao.com/v2/user/me", {});

    // console.log(resMe.data);

    nextResponse.cookies.set("kakao_test_token", resToken.data.access_token);

    return nextResponse;
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL(`/`, request.url));
  }
}

export { Proxy as GET, Proxy as POST };
