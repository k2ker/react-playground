"use client";
import { usePatchUserMe, useUserMeGet } from "@/api/user";
import Input from "@/components/ui/Input";
import { Validation } from "@/utils/validation";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const UserEditForm = () => {
  const { data: user } = useUserMeGet();
  const usePatchUserMeMutation = usePatchUserMe();
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<SignUpInputs>({ mode: "onChange" });

  useEffect(() => {
    !Cookies.get("hong_access_token")
      ? router.replace("/")
      : setToken(Cookies.get("hong_access_token") ?? null);
  }, []);

  const handleClickEditUser = useCallback((name: string) => {
    usePatchUserMeMutation.mutate(
      {
        name: name,
      },
      {
        onSuccess: (data) => {
          alert("수정 완료");
        },
        onError: (error) => {
          axios.isAxiosError(error)
            ? alert(error?.response?.data?.message)
            : alert("수정 실패");
        },
      },
    );
  }, []);

  return (
    <section className="flex w-full max-w-md flex-col items-center gap-10 rounded-3xl bg-white p-4">
      <h1>Home</h1>
      <div className="flex w-full flex-row gap-3 ">
        <Input
          className="w-full flex-1"
          placeholder="Name"
          error={errors.name?.message}
          defaultValue={user?.name ?? "이름없음"}
          success={!!(watch("name") && !errors.name?.message)}
          {...register("name", {
            ...Validation.name,
          })}
        />
        <button
          className=" h-12 w-28 rounded-lg bg-blue-500 text-white disabled:bg-gray-300"
          type="button"
          disabled={!(watch("name") && !errors.name?.message)}
          onClick={() => handleClickEditUser(getValues("name"))}
        >
          수정
        </button>
      </div>
      <p>{user?.email ?? "이메일 없음"}</p>
      <p>{token}</p>
    </section>
  );
};

export default memo(UserEditForm);
