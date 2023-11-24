import { useEffect } from "react";
import Router from "next/router";

import { isAuth } from "utils/auth";
import { useUser } from "./useUsers";

const ADMIN_ROLE = "admin";

const useAdmin = (): boolean => {
  const authenticated = isAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!authenticated) {
      Router.replace("/");
    } else if (authenticated && user && user.role !== ADMIN_ROLE) {
      Router.replace("/");
    }
  }, [authenticated, user]);

  return user?._id && user.role === ADMIN_ROLE;
};

export default useAdmin;
