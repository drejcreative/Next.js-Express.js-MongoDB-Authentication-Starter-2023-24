import { useEffect } from "react";
import Router from "next/router";

import { isAuth } from "../utils/auth";

const usePrivate = () => {
  const authenticated = isAuth();

  useEffect(() => {
    if (!authenticated) {
      Router.replace("/auth");
    }
  }, [authenticated]);

  return authenticated;
};

export default usePrivate;
