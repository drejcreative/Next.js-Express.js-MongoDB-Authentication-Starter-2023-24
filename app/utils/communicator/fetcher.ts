import axios from "axios";

import { getCookie } from "../auth";

export const preparePayload = (token?: string) => {
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {};
};

const fetcher = (url: string) => {
  const token = getCookie();
  return axios.get(url, preparePayload(token)).then((res) => res.data);
};

export default fetcher;
