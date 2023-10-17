"use client";
import { employeeKeys } from "@/api/employee";
import { useQueryClient } from "@tanstack/react-query";
import { memo, useEffect } from "react";

interface Props {
  children: React.ReactElement;
}

const SseProviders = ({ children }: Props) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/api/notion/employee/sse`,
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received SSE:", data);
      queryClient.setQueryData(employeeKeys.all, data?.employee);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return <>{children}</>;
};

export default memo(SseProviders);
