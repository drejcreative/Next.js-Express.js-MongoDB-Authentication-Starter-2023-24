import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import { Jost } from "next/font/google";

import Root from "@/components/App/App";

import "../styles/index.scss";

const jost = Jost({ subsets: ["latin"] });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <main className={jost.className}>
      <Root {...pageProps}>
        <Component {...pageProps} />
      </Root>
    </main>
  );
};

export default appWithTranslation(MyApp);
