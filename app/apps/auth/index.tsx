import React, { useState } from "react";
import { useTranslation } from "next-i18next";

import SignupForm from "./form/SignupForm";
import SigninForm from "./form/SigninForm";
import AuthLayout from "./components/AuthLayout";

import styles from "./index.module.scss";

const AuthLanding = () => {
  const [current, setCurrent] = useState("signin");
  const { t } = useTranslation("common");

  return (
    <AuthLayout>
      <div className={styles.header}>
        <div className={styles.right}>
          {current === "signin" ? (
            <span onClick={() => setCurrent("signup")}>{t("signUp")}</span>
          ) : (
            <span onClick={() => setCurrent("signin")}>{t("signIn")}</span>
          )}
        </div>
        <h2>{current === "signin" ? t("signIn") : t("signUp")}</h2>
      </div>
      {current === "signup" ? <SignupForm /> : <SigninForm />}
    </AuthLayout>
  );
};

export default AuthLanding;
