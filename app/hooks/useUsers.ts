import useSWR from "swr";

import fetcher from "@/utils/communicator/fetcher";
import AUTH_URL from "@/services/authService";

const useUser = () => {
  const {
    data: user,
    error,
    isLoading,
    mutate,
  } = useSWR(AUTH_URL.profile, fetcher);

  const loggedOut = error && error.status === 403;

  return { user, isLoading, error, loggedOut, mutate };
};

export { useUser };
