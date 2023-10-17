import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";

export const employeeKeys = {
  all: ["employee"] as const,
};

export const getEmployee = async () => {
  const response = await api.get(`/api/notion/employee/get`);
  return response.data;
};

export const useEmployeeGet = () =>
  useQuery(employeeKeys.all, () => getEmployee(), {
    suspense: false,
  });

export const postEmployee = async (params: EmployeePostParam) => {
  const response = await api.post(`/api/notion/employee/add`, { ...params });
  return response.data;
};

export const useEmployeePost = () => {
  const queryClient = useQueryClient();
  return useMutation((params: EmployeePostParam) => postEmployee(params), {
    onSuccess: () => {
      queryClient.invalidateQueries(employeeKeys.all);
    },
  });
};

export const patchEmployee = async (id: string, params: EmployeePatchParam) => {
  const response = await api.patch(`/api/notion/employee/update/${id}`, {
    ...params,
  });
  return response.data;
};

export const useEmployeePatch = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, params }: { id: string; params: EmployeePatchParam }) =>
      patchEmployee(id, params),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(employeeKeys.all);
      },
    },
  );
};

export const deleteEmployee = async (id: string) => {
  const response = await api.delete(`/api/notion/employee/remove/${id}`);
  return response.data;
};

export const useEmployeeDelete = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteEmployee(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(employeeKeys.all);
    },
  });
};
