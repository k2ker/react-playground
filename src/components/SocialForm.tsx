import Link from "next/link";

const SocialForm = () => {
  return (
    <section className="flex w-full flex-col gap-2">
      <Link
        className="btn-kakao"
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_PATH}/api/proxy&state=/`}
        replace
        // target="_blank"
      >
        KAKAO
      </Link>
      <Link
        className="btn-google"
        href={`/api/auth/google`}
        // target="_blank"
      >
        GOOGLE
      </Link>
    </section>
  );
};

export default SocialForm;
