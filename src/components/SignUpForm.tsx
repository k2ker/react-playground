"use client";
import { memo, useEffect, useState } from "react";
import axios from "axios";
import SocialForm from "./SocialForm";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  name: string;
  password: string;
};

const SignUpForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try{
      const response = await axios.post('http://localhost:3000/auth/signup', {
        email: data?.email,
        password: data?.password 
      });
      // TODO : response.data.accessToken 활용
      // response.data.accessToken
    }catch(error){
      // TODO : error handling
      // error.response.data.message
    }

    // await signIn("credentials", {
    //   email: data?.email,
    //   name: data?.name,
    //   password: data?.password,
    //   redirect: false,
    // }).then((result) => {
    //   if (result?.ok) router.push("/auth/email");
    // });
  };

  return (
    <div className="w-full">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-auth"
          placeholder="Name"
          required
          type="text"
          value="홍길동"
          {...register("name")}
        />
        <input
          className="input-auth"
          placeholder="E-mail"
          required
          type="email"
          value="nightowl11@gmail.com"
          {...register("email")}
        />
        <input
          className="input-auth"
          placeholder="Password"
          required
          type="password"
          value="112233"
          {...register("password")}
        />
        <button className="btn-auth" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default memo(SignUpForm);
