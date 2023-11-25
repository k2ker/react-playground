"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { PagesConfig } from "@/core/path";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();

  return (
    <body>
      {!PagesConfig[currentPath] ? (
        <Header />
      ) : (
        PagesConfig[currentPath]?.showHaeder && <Header />
      )}
      {children}
    </body>
  );
}
