"use client";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

export interface Props {}

const Header = () => {
  const path = usePathname();
  const router = useRouter();
  const { isLoggedIn, logout } = useAuthStore();

  const handleLogout = useCallback(() => {
    logout(() => {
      router.push("/");
    });
  }, [logout, router]);

  if (path?.startsWith("/login")) {
    return null;
  }

  return (
    <header className=" fixed left-0 top-0 z-50 flex h-16 w-full flex-row items-center justify-between bg-blue-500 p-4">
      <Link href="/">HOME</Link>
      {Cookies.get("kakao_test_nickname") ? (
        <div className="flex flex-row items-center gap-6">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={Cookies.get("kakao_test_thumbnail")!}
              fill
              alt="profile"
            />
          </div>
          <div>{Cookies.get("kakao_test_nickname")}</div>

          <button
            onClick={() => {
              Cookies.remove("kakao_test_nickname");
              Cookies.remove("kakao_test_token");
              Cookies.remove("kakao_test_thumbnail");
              router.refresh();
            }}
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link href="/login">로그인</Link>
      )}
      {/* {isLoggedIn ? (
        <div className="flex flex-row gap-6">
          {!path?.startsWith("/mypage") && (
            <Link href={"/mypage"}>마이페이지</Link>
          )}
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <Link href="/login">로그인</Link>
      )} */}
    </header>
  );
};

export default memo(Header);
