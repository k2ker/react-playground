"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { memo } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { NavPage } from "@/core/path";

const navVariants = {
  open: { opacity: 1, x: 0, transition: { duration: 0.2 } },
  closed: { opacity: 0, x: "-100%", transition: { duration: 0.2 } },
};

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsNavOpen(false);
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClickNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-blue-500 p-4 md:flex">
        <Link href="/" className="font-bold text-white">
          HOME
        </Link>
        <nav>
          <ul className="flex items-center gap-4">
            {NavPage.map((page) => (
              <li key={page.path}>
                <Link
                  href={page.path}
                  className={
                    pathName.startsWith(page.path) ? "text-black" : "text-white"
                  }
                >
                  {page.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {mounted && Cookies.get("kakao_test_nickname") ? (
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white">
              <Image
                src={Cookies.get("kakao_test_thumbnail")!}
                fill
                alt="profile"
              />
            </div>
            <span className="font-medium text-white">
              {Cookies.get("kakao_test_nickname")}
            </span>
            <button
              onClick={() => {
                Cookies.remove("kakao_test_nickname");
                Cookies.remove("kakao_test_token");
                Cookies.remove("kakao_test_thumbnail");
                router.refresh();
              }}
              className="rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
            >
              로그아웃
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="rounded bg-green-500 px-3 py-2 text-white hover:bg-green-600"
          >
            로그인
          </Link>
        )}
      </header>
      <header className=" fixed left-0 top-0 z-50 flex h-16 w-full flex-row items-center justify-between bg-blue-500 p-4 md:hidden ">
        <div
          className="flex h-4 w-5 cursor-pointer flex-col justify-around"
          onClick={handleClickNav}
        >
          <span className="block h-0.5 w-full bg-black"></span>
          <span className="block h-0.5 w-full bg-black"></span>
          <span className="block h-0.5 w-full bg-black"></span>
        </div>
      </header>
      <AnimatePresence>
        {isNavOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={navVariants}
            transition={{ duration: 0.5 }}
            className="fixed left-0 top-0 z-50 flex h-screen w-[80%] flex-col bg-white p-4 md:hidden"
          >
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={handleClickNav}
            >
              <div className="text-xl font-bold text-gray-700">Hong Ground</div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                  stroke="black"
                  strokeWidth="2"
                />
                <line
                  x1="6"
                  y1="18"
                  x2="18"
                  y2="6"
                  stroke="black"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {mounted && Cookies.get("kakao_test_nickname") ? (
              <div className="mt-6 flex flex-col items-center">
                <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-blue-500">
                  <Image
                    src={Cookies.get("kakao_test_thumbnail")!}
                    fill
                    alt="profile"
                  />
                </div>
                <div className="text-lg font-semibold">
                  {Cookies.get("kakao_test_nickname")}
                </div>
                <button
                  onClick={() => {
                    Cookies.remove("kakao_test_nickname");
                    Cookies.remove("kakao_test_token");
                    Cookies.remove("kakao_test_thumbnail");
                    router.refresh();
                  }}
                  className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="rounded-lg bg-blue-500 px-5 py-3 text-white hover:bg-blue-700"
                >
                  로그인
                </Link>
              </div>
            )}
            <nav>
              <ul className="flex items-center gap-4">
                {NavPage.map((page) => (
                  <li key={page.path}>
                    <Link href={page.path} className="text-white">
                      {page.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(Header);
