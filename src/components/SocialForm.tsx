import KakaoLiginButton from "./Social/KakaoLoginButton";
import NaverLoginButton from "./Social/NaverLoginButton";
import GoogleLoginButton from "./Social/GoogleLoginButton";

interface SocialFormProps {
  trigger: () => void;
  disabled?: boolean;
}

const SocialForm = ({ trigger, disabled }: SocialFormProps) => {
  return (
    <section className="flex w-full flex-col gap-2">
      <KakaoLiginButton />
      <NaverLoginButton />
      <GoogleLoginButton />
    </section>
  );
};

export default SocialForm;
