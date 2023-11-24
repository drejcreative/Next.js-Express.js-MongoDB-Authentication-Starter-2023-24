import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { useTranslation } from "next-i18next";
import Image from "next/image";

import Button from "components/Button/Button";
import { activateAccountService } from "@/apps/auth/services/authServices";
import { useAuth } from "./hooks/useAuth";
import AuthLayout from "./components/AuthLayout";
import { globalError } from "@/components/globalError/globalError";

import style from "./ActivateComponent.module.scss";

interface Iprops {
  token: string;
}

const ActivateComponent: React.FC<Iprops> = ({ token }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState<any>(null);
  const { t } = useTranslation("common");

  const { login } = useAuth();

  useEffect(() => {
    if (token) {
      const { firstName } = jwt.decode(token) as { firstName: string };
      setUser(firstName);
    }
  }, [token]);

  const activateAccount = async () => {
    try {
      const newToken = await activateAccountService({ token });
      login(newToken);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <AuthLayout>
      <div className={`${style.activate} ${style.center}`}>
        <Image src="/images/activate.svg" alt="" width={200} height={200} />
        <br />
        <Button
          text={`${t("activateAccount")} ${user}`}
          secoundary
          onClick={activateAccount}
        />
        <br />
        {globalError(error)}
      </div>
    </AuthLayout>
  );
};

export default ActivateComponent;
