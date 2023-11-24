import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

import ActivateComponent from "apps/auth/ActivateComponent";

interface ActivateProps {
  token: string;
}

export default function Activate({ token }: ActivateProps) {
  return <ActivateComponent token={token} />;
}

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query: { token },
}) => {
  if (token) {
    return {
      props: {
        token,
        ...(await serverSideTranslations(locale as string, ["common"])),
      },
    };
  }
  return {
    props: {
      token: null,
      ...(await serverSideTranslations(locale as string, ["common"])),
    },
  };
};
