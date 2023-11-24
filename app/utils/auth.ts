import cookie from "js-cookie";
import { parseCookies } from "nookies";
import { NextPageContext } from "next";

export const getCookie = (key: string = "token"): string | undefined => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};

export const isAuth = () => (getCookie() ? true : false);

export const getServerSideToken = (ctx: NextPageContext) => {
  const { token } = parseCookies(ctx);
  return token;
};
