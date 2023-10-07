"use client";
import { memo, useCallback, useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEmailDupCheckPost, useSignUpPost } from "@/api/auth";
import Cookies from "js-cookie";
import Input from "./ui/Input";
import { Validation } from "@/utils/validation";

const SignUpForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [isEmailDupCheck, setIsEmailDupCheck] = useState(false); //이메일 중복확인 여부
  const useSignUpPostMutation = useSignUpPost();
  const useEmailDupCheckMutation = useEmailDupCheckPost();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<SignUpInputs>({ mode: "onChange" });

  const onSubmit: SubmitHandler<SignUpInputs> = async (data) => {
    useSignUpPostMutation.mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (data) => {
          alert(data)
          // TODO 로그인 폼으로 변경

          // //쿠키 저장
          // Cookies.set("hong_access_token", data.accessToken, {
          //   expires: data.expiresDate, //Date
          // });
          // //페이지 이동
          // router.push("/home");
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
          <Input
            className="w-full flex-1"
            disabled={isEmailDupCheck}
            placeholder="E-mail"
            error={errors.email?.message}
            success={!!(watch("email") && !errors.email?.message)}
            {...register("email", {
              ...Validation.email,
            })}
          />
          <button
            className=" h-12 w-28 rounded-lg bg-blue-500 text-white disabled:bg-gray-300"
            type="button"
            disabled={
              !(watch("email") && !errors.email?.message) || isEmailDupCheck
            }
            onClick={() => handleClickEmailDupCheck(getValues("email"))}
          >
            중복체크
          </button>
        </div>
        <Input
          placeholder="Name"
          error={errors.name?.message}
          success={!!(watch("name") && !errors.name?.message)}
          {...register("name", {
            ...Validation.name,
          })}
        />
        <Input
          placeholder="Password"
          type="password"
          success={!!(watch("password") && !errors.password?.message)}
          error={errors.password?.message}
          {...register("password", {
            ...Validation.password,
            onChange: () => setValue("passwordRepeat", ""),
          })}
        />
        <Input
          placeholder="Password Repeat"
          type="password"
          success={
            !!(
              watch("passwordRepeat") &&
              watch("passwordRepeat") === watch("password") &&
              !errors.passwordRepeat?.message
            )
          }
          error={errors.passwordRepeat?.message}
          {...register("passwordRepeat", {
            required: "미입력 상태입니다.",
            validate: () =>
              watch("passwordRepeat") === watch("password") ||
              "비밀번호가 일치하지 않습니다.",
          })}
        />
        <button
          className="btn-auth disabled:bg-slate-300"
          type="submit"
          disabled={
            !(
              watch("email") &&
              !errors.email?.message &&
              watch("password") &&
              !errors.password?.message &&
              watch("password") === watch("passwordRepeat") &&
              watch("name") &&
              !errors.name?.message &&
              isEmailDupCheck
            )
          }
        >
          가입하기
        </button>
      </form>
    </div>
  );
};

export default memo(SignUpForm);
