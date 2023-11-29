import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./api";
import Cookies from "js-cookie";

export const userKeys = {
  all: ["user"] as const,
};

const getUserMe = async () => {
  const response = await api.get(`/api/user/me`);
  return response.data;
};

export const useUserMeGet = () =>
  useQuery({
    queryKey: userKeys.all,
    queryFn: () => getUserMe(),
    enabled: !!Cookies.get("hong_access_token"),
  });

const patchUserMe = (params: UserPatchParam) => {
  return api.patch(`/api/user/me`, params);
};

export const usePatchUserMe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UserPatchParam) => patchUserMe(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.all,
      });
    },
  });
};
