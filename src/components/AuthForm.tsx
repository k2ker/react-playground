"use client";
import { memo, useState } from "react";
import SocialForm from "./SocialForm";
import React from "react";
import SignupForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <section className="flex w-full max-w-md flex-col items-center gap-10 rounded-3xl bg-white p-4">
      {isLogin ? (
        <React.Fragment>
          <h1>로그인</h1>
          <SignInForm />
          <h2 onClick={() => setIsLogin(false)}>회원가입</h2>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h1>회원가입</h1>
          <SignupForm trigger={() => setIsLogin(false)} />
          <h2 onClick={() => setIsLogin(true)}>로그인으로 돌아가기</h2>
        </React.Fragment>
      )}
      <SocialForm />
    </section>
  );
};

export default memo(AuthForm);
