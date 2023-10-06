"use client";
import { useSession } from "next-auth/react";
import React, { Suspense } from "react";
import Image from "next/image";
import dayjs from "dayjs";

export default function Auth({ params }: { params: { auth: string } }) {
  const { data: session, status } = useSession();

  if (status === "loading")
    return (
      <main className=" main flex w-full flex-col items-center justify-center gap-6 text-white">
        LOADING...
      </main>
    );

  if (!session)
    return (
      <main className=" main flex w-full flex-col items-center justify-center gap-6 text-white">
        로그인이 필요합니다.
        <div>인증상태 : {status}</div>
      </main>
    );

  return (
    <main className=" main flex w-full flex-col items-center justify-center gap-6 text-white">
      {session?.user?.image && (
        <div className="relative h-28 w-28 overflow-hidden rounded-full">
          <Image src={session?.user?.image!} fill alt="profile" />
        </div>
      )}
      <div>플랫폼 : {params?.auth}</div>
      <div>인증상태 : {status}</div>
      <div>이름 : {session?.user?.name}</div>
      <div>이메일 : {session?.user?.email}</div>
      <div>
        토큰 :{" "}
        {session?.user?.accessToken
          ? session?.user?.accessToken
          : "email로그인은 니가 만들어줘야됨"}
      </div>
      <div>
        세션만료 : {dayjs(session?.expires)?.format("YYYY-MM-DD HH:mm:ss")}
      </div>
    </main>
  );
}
