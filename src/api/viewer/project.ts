import { useSuspenseQuery } from "@tanstack/react-query";
import api from "./api";

export const projectKeys = {
  all: ["project"] as const,
  id: (id: string) => [...projectKeys.all, id] as const,
};

export const getProject = async (id: string) => {
  const randomDelay = Math.floor(Math.random() * 3000);
  await new Promise((resolve) => setTimeout(resolve, randomDelay));
  const response = await api.get(`/api/notion/employee/get`);
  return response.data;
};

export const useProjectGet = (id: string) =>
  useSuspenseQuery({
    queryKey: projectKeys.id(id),
    queryFn: () => getProject(id),
  });
