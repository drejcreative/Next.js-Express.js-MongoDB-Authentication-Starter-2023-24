import Router from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AuthLanding from "../../apps/auth";
import { Loader, LoaderWrap } from "components/Loader/Loader";
import { getCookie } from "utils/auth";

const Signup = () => {
  const token = getCookie();

  if (token) {
    Router.push("/");
    return (
      <LoaderWrap>
        <Loader />
      </LoaderWrap>
    );
  }

  return <AuthLanding />;
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 10,
  };
}

export default Signup;
