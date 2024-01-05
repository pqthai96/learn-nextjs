import useSWR from "swr";
import {PublicConfiguration} from "swr/_internal";
import {authApi} from "@/api";

export function useAuth(options?: Partial<PublicConfiguration>) {

  // Profile
  const {data: profile, error, mutate} = useSWR('/profile', {
    dedupingInterval: 60 * 60 * 1000,
    revalidateOnFocus: false,
    ...options
  });

  const firstLoading = profile === undefined && error === undefined;

  async function login() {
    await authApi.login({
      username: "admin",
      password: "123456"
    })

    await mutate();
  }

  async function logout() {
    await authApi.logout();

    await mutate({}, false);
  }

  return {
    profile,
    error,
    login,
    logout,
    firstLoading
  }
}