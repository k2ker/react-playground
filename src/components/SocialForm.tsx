import Link from "next/link";

interface SocialFormProps {
  trigger: () => void;
  disabled?: boolean;
}

const SocialForm = ({ trigger, disabled }: SocialFormProps) => {
  return (
    <section className="flex w-full flex-col gap-2">
      <Link
        className={`btn-kakao ${disabled && "bg-gray-300"}`}
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_PATH}/api/proxy&state=/`}
        replace
        onClick={() => trigger()}
        // target="_blank"
      >
        KAKAO
      </Link>
      <Link
        className={`btn-google ${disabled && "bg-gray-300"}`}
        href={`/api/auth/google`}
        onClick={() => trigger()}
        // target="_blank"
      >
        GOOGLE
      </Link>
    </section>
  );
};

export default SocialForm;
