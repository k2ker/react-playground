"use client";
import { useAuthStore } from "@/store/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";

export interface Props {}

const Header = () => {
  const path = usePathname();
  const router = useRouter();
  const [shouldRender, setShouldRender] = useState(false);
  const { isLoggedIn, logout } = useAuthStore();

  useEffect(() => {
    if (path) {
      setShouldRender(!path.startsWith("/login"));
    }
  }, [path]);

  const handleLogout = useCallback(() => {
    logout(() => {
      router.push("/");
    });
  }, [logout, router]);

  if (!shouldRender) {
    return <></>;
  }

  return (
    <header className="fixed left-0 top-0 flex h-16 w-full flex-row items-center justify-between bg-blue-500 p-4">
      <Link href="/">HOME</Link>
      {isLoggedIn ? (
        <div className="flex flex-row gap-6">
          {!path.startsWith("/mypage") && (
            <Link href={"/mypage"}>마이페이지</Link>
          )}
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </header>
  );
};

export default memo(Header);
