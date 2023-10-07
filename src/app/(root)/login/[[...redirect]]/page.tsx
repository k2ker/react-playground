"use client";
import AuthForm from "@/components/AuthForm";
import { useAuthStore, useRdirectStore } from "@/store/auth";
import { useEffect } from "react";

export default function Login({
  params,
}: {
  params: { redirect?: Array<string> };
}) {
  const { redirectSet } = useRdirectStore();
  const { logout } = useAuthStore();

  useEffect(() => {
    logout();
    redirectSet(params.redirect?.[0] ?? "/");
  }, []);

  return (
    <main className="main flex items-center justify-center">
      <AuthForm />
    </main>
  );
}
