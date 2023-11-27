import Link from "next/link";

export default function GoogleLoginButton() {
  const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI || "";
  const SCOPE =
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

  const createGoogleLoginUrl = () => {
    const params = new URLSearchParams();
    params.append("client_id", CLIENT_ID);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("scope", SCOPE);
    params.append("response_type", "code");
    params.append("access_type", "offline");
    params.append("prompt", "consent");
    params.append("state", "/");
    return `${GOOGLE_AUTH_URL}?${params.toString()}`;
  };

  return (
    <Link className="btn-google" href={createGoogleLoginUrl()}>
      GOOGLE
    </Link>
  );
}
