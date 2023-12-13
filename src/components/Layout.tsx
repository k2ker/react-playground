"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import { PagesConfig } from "@/core/path";

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentPath = usePathname();
  const firstSegment = currentPath.split("/")[1];
  const shouldRenderHeader = PagesConfig[`/${firstSegment}`]?.showHaeder;

  return (
    <body>
      {shouldRenderHeader && <Header />}
      {children}
    </body>
  );
}
