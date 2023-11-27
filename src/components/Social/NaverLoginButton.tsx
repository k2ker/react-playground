import Link from "next/link";

export default function NaverLoginButton() {
  const NAVER_AUTH_URL = "https://nid.naver.com/oauth2.0/authorize";
  const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "";
  const REDIRECT_URI = process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI || "";

  const createNaverLoginUrl = () => {
    const params = new URLSearchParams();
    params.append("response_type", "code");
    params.append("client_id", CLIENT_ID);
    params.append("redirect_uri", REDIRECT_URI);
    return `${NAVER_AUTH_URL}?${params.toString()}`;
  };

  return (
    <Link className="btn-naver" href={createNaverLoginUrl()}>
      NAVER
    </Link>
  );
}
