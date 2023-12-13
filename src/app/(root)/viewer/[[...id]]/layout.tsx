import Header from "@/components/ProjectViewer/Header";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Suspense>{children}</Suspense>
    </>
  );
}
