"use client";
import { memo, useCallback, useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEmailDupCheckPost, useSignUpPost } from "@/api/auth";
import Cookies from "js-cookie";

const SignUpForm = () => {
  const router = useRouter();
  const [isEmailDupCheck, setIsEmailDupCheck] = useState(false); //이메일 중복확인 여부
  const useSignUpPostMutation = useSignUpPost();
  const useEmailDupCheckMutation = useEmailDupCheckPost();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SignUpInputs>();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    useSignUpPostMutation.mutate(
      {
        name: data.name,
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
            : alert("회원가입 실패");
        },
      },
    );
  };

  const handleClickEmailDupCheck = useCallback((email: string) => {
    useEmailDupCheckMutation.mutate(
      {
        email: email,
      },
      {
        onSuccess: (data) => {
          setIsEmailDupCheck(true);
          alert("사용가능한 이메일입니다.");
        },
        onError: (error) => {
          setIsEmailDupCheck(false);
          axios.isAxiosError(error)
            ? alert(error?.response?.data?.message)
            : alert("이메일 중복확인 실패");
        },
      },
    );
  }, []);

  return (
    <div className="w-full">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex w-full flex-row gap-3 ">
          <input
            className="input-auth flex-1 disabled:bg-gray-500"
            placeholder="E-mail"
            required
            disabled={isEmailDupCheck}
            type="email"
            {...register("email")}
          />
          <button
            className=" h-12 w-28 rounded-lg bg-blue-500 text-white"
            type="button"
            onClick={() => handleClickEmailDupCheck(getValues("email"))}
          >
            중복체크
          </button>
        </div>
        <input
          className="input-auth"
          placeholder="Name"
          required
          type="text"
          {...register("name")}
        />
        <input
          className="input-auth"
          placeholder="Password"
          required
          type="password"
          {...register("password")}
        />
        <input
          className="input-auth"
          placeholder="Password Repeat"
          required
          type="password"
          {...register("passwordRepeat")}
        />
        <button
          className="btn-auth disabled:bg-slate-300"
          type="submit"
          disabled={
            !(
              watch("email") &&
              watch("password") &&
              watch("password") === watch("passwordRepeat") &&
              watch("name") &&
              isEmailDupCheck
            )
          }
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default memo(SignUpForm);
