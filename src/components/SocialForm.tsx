"use client";
import { memo, useCallback } from "react";
import { signIn } from "next-auth/react";

const SocialForm = () => {
  const handleClickSocial = useCallback(async (social: string) => {
    await signIn(social, {
      redirect: true,
      callbackUrl: `/auth/${social}`,
    }).catch((err) => console.log(err));
  }, []);

  return (
    <section className="flex w-full flex-col gap-2">
      <button
        className="btn-kakao"
        type="submit"
        onClick={() => handleClickSocial("kakao")}
      >
        KAKAO
      </button>
      <button
        className="btn-naver"
        type="submit"
        onClick={() => handleClickSocial("naver")}
      >
        NAVER
      </button>
    </section>
  );
};

export default memo(SocialForm);
