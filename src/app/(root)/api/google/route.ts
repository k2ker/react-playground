import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");

    console.log(searchParams);

    const tokenResponse = await axios.post(
      `https://oauth2.googleapis.com/token`,
      {
        code: code,
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      },
    );

    const accessToken = tokenResponse.data.access_token;

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    const resMe = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
    );

    const nextResponse = NextResponse.redirect(new URL(`/`, request.url));

    nextResponse.cookies.set("hong_user_nickname", resMe.data.name);

    nextResponse.cookies.set("hong_user_thumbnail", resMe.data.picture ?? "");

    console.log(resMe.data);

    return nextResponse;
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL(`/`, request.url));
  }
}

// export { Google as GET, Google as POST };
