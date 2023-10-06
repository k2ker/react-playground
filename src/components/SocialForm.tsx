"use client";
import { memo, useCallback } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";

const SocialForm = () => {
  const handleClickSocial = useCallback(async (social: string) => {
    window.location.href = `https://hong-ground.com/api/auth/${social}`;

    // await signIn(social, {
    //   redirect: true,
    //   callbackUrl: `/auth/${social}`,
    // }).catch((err) => console.log(err));
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
        className="btn-google"
        type="submit"
        onClick={() => handleClickSocial("google")}
      >
        GOOGLE
      </button>
    </section>
  );
};

export default memo(SocialForm);
