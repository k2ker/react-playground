import Link from "next/link";

const SocialForm = () => {
  return (
    <section className="flex w-full flex-col gap-2">
      <Link
        className="btn-kakao"
        href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/kakao`}
        // target="_blank"
      >
        KAKAO
      </Link>
      <Link
        className="btn-google"
        href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`}
        // target="_blank"
      >
        GOOGLE
      </Link>
    </section>
  );
};

export default SocialForm;
