import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

import ForgetPaswordComponent from "@/apps/auth/form/ForgetPaswordComponent";
import ResetPaswordComponent from "@/apps/auth/form/ResetPasswordComponent";

interface ResetPasswordProps {
  token: string;
}

const ResetPassword = ({ token }: ResetPasswordProps) => {
  if (token) {
    return <ResetPaswordComponent token={token} />;
  }
  return <ForgetPaswordComponent />;
};

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

export default ResetPassword;
