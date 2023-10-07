import { useRdirectStore } from "@/store/auth";
import Link from "next/link";

const SocialForm = () => {
  const { redirect } = useRdirectStore();
  return (
    <section className="flex w-full flex-col gap-2">
      <Link
        className="btn-kakao"
        href={`/api/auth/kakao`}
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
