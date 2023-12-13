import { useSuspenseQuery } from "@tanstack/react-query";
import api from "./api";

export const projectKeys = {
  all: ["project"] as const,
  id: (id: string) => [...projectKeys.all, id] as const,
};

export const getProject = async (id: string) => {
  const response = await api.get(`/api/notion/employee/gets/${id}`);
  return response.data;
};

export const useProjectGet = (id: string) =>
  useSuspenseQuery({
    queryKey: [...projectKeys.id(id)],
    queryFn: () => getProject(id),
  });
