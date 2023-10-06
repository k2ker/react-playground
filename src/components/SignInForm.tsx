"use client";
import { memo } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
};

interface Props {
  trigger(): void;
}

const SignInForm = ({ trigger }: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const result = await signIn("credentials", {
      email: data?.email,
      password: data?.password,
      redirect: false,
    });

    if (result?.ok) router.push("/auth/email");

    if (result?.error) {
      switch (result?.error) {
        case "noUser": {
          trigger();
          break;
        }
      }
    }
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
