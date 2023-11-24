import React from "react";
import { AnimatePresence } from "framer-motion";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

import Initialize from "./Initialize";

import store from "@/store/store";

const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig>
      <Provider store={store}>
        <Initialize>
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </Initialize>
      </Provider>
    </SWRConfig>
  );
};

export default Root;
