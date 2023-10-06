"use client";
import { memo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSignInPost } from "@/api/auth";
import Cookies from "js-cookie";
import axios from "axios";

const SignInForm = () => {
  const router = useRouter();
  const useSignInPostMutation = useSignInPost();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignInInputs>();

  const onSubmit: SubmitHandler<SignInInputs> = (data) => {
    useSignInPostMutation.mutate(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          //쿠키 저장
          Cookies.set("hong_access_token", data.token, {
            expires: data.expiresDate, //Date
          });
          //페이지 이동
          router.push("/home");
        },
        onError: (error) => {
          axios.isAxiosError(error)
            ? alert(error?.response?.data?.message)
            : alert("로그인 실패");
        },
      },
    );
  };

  return (
    <div className="w-full">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-auth"
          placeholder="E-mail"
          required
          type="email"
          {...register("email")}
        />
        <input
          className="input-auth"
          placeholder="Password"
          required
          type="password"
          {...register("password")}
        />
        <button className="btn-auth" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default memo(SignInForm);
