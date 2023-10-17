"use client";
import { memo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SseProviders from "./SseProviders";

interface Props {
  children: React.ReactElement;
}

const Providers = ({ children }: Props) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SseProviders>{children}</SseProviders>
    </QueryClientProvider>
  );
};

export default memo(Providers);
