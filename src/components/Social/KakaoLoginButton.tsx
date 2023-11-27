import Link from "next/link";

export default function KakaoLiginButton() {
  const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize";
  const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || "";
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || "";

  const createKakaoLoginUrl = () => {
    const params = new URLSearchParams();
    params.append("response_type", "code");
    params.append("client_id", CLIENT_ID);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("state", "/");
    return `${KAKAO_AUTH_URL}?${params.toString()}`;
  };
  return (
    <Link
      className={`btn-kakao`}
      href={createKakaoLoginUrl()}
      replace
      // target="_blank"
    >
      KAKAO
    </Link>
  );
}
