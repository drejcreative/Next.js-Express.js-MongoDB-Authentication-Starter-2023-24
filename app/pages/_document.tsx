import { Html, Head, Main, NextScript } from "next/document";

import useTheme from "@/hooks/useTheme";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>{process.env.APP_NAME}</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="DEscription" />
        <meta name="keywords" content="JS" />
        <meta name="author" content="Andrej Vajagic" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
