import { create } from "zustand";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { QueryClient } from "@tanstack/react-query";
import { userKeys } from "@/api/user";

const queryClient = new QueryClient();

interface RedirectState {
  redirect: string;
  redirectSet: (path: string) => void;
  redirectReset: () => void;
}

interface AuthState {
  isLoggedIn: boolean;
  logout: (callback?: () => void) => void;
}
export const useRdirectStore = create<RedirectState>((set) => ({
  redirect: "/",
  redirectSet: (path: string) => set(() => ({ redirect: path })),
  redirectReset: () => set({ redirect: "/" }),
}));

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!Cookies.get("hong_access_token"),
  logout: (callback) => {
    Cookies.remove("hong_access_token");
    set({ isLoggedIn: false });
    queryClient.removeQueries({
      queryKey: userKeys.all,
    });
    callback && callback();
  },
}));
