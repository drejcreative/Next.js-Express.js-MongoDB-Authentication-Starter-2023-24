import React from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Button from "components/Button/Button";
import Language from "components/Language/Language";
import { useUser } from "hooks/useUsers";
import ThemeChange from "components/ThemeChange/ThemeChange";
import { useAuth } from "@/apps/auth/hooks/useAuth";

import styles from "./index.module.scss";

const Index = () => {
  const { user } = useUser();
  const { logout } = useAuth();
  const { t } = useTranslation("common");

  console.log("user", user);

  return (
    <div className={styles.main}>
      <header>
        <div>LOGO</div>
        <div className={styles.right}>
          {!user && (
            <Link href="/auth" passHref>
              <p className={styles.link}>{t("signIn")}</p>
            </Link>
          )}
          <Link href="/protected" passHref>
            <p className={styles.link}>{t("goToProtected")}</p>
          </Link>
          <Link href="/admin" passHref>
            <p className={styles.link}>{t("goToAdmin")}</p>
          </Link>
          <ThemeChange />
          <Language />
          {user && (
            <Button
              text={`LOGOUT`}
              secoundary
              onClick={() => {
                logout();
              }}
            />
          )}
        </div>
      </header>

      <main>
        <h1>{t("test")}</h1>
        <img
          src="https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
        />
      </main>
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 10,
  };
}

export default Index;
