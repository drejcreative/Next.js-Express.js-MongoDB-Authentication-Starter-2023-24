import React, { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { FaRegEnvelope } from "react-icons/fa";

import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Message from "components/message/Message";
import { resetPasswordService } from "@/apps/auth/services/authServices";
import LinkComponent from "components/Link/Link";
import AuthLayout from "../components/AuthLayout";
import useResetPasswordValidator from "../validations/useResetPasswordValidator";
import { isApiError } from "@/utils/errorHandling";
import { IError } from "@/interface/error";
import { globalError } from "@/components/globalError/globalError";

import styles from "../ActivateComponent.module.scss";

interface FormValues {
  newPassword: string;
  passwordRetype: string;
}

const ResetPaswordComponent = ({ token }: { token: string }) => {
  const resetPasswordValidator = useResetPasswordValidator();
  const [message, setMessage] = useState("");
  const [error, setError] = useState<IError | undefined>();
  const { t } = useTranslation("common");

  const resetPassword = async (values: FormValues) => {
    try {
      const res = await resetPasswordService({
        resetPaswordLink: token,
        ...values,
      });
      return res;
    } catch (err) {
      throw err;
    }
  };

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      passwordRetype: "",
    },
    validationSchema: resetPasswordValidator,
    onSubmit: async (values, actions) => {
      try {
        const res = await resetPassword(values);
        actions.resetForm();
        setMessage(res.message);
      } catch (error) {
        if (isApiError(error)) {
          if (error.field === "global") {
            setError(error);
          }
          actions.setFieldError(error.field, error.message);
        }
      }
    },
  });

  return (
    <AuthLayout>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.activate}>
          <div className={styles.imageWrap}>
            <Image
              src="/images/email.svg"
              width={200}
              height={300}
              alt="Picture of the author"
            />
          </div>
          <Input
            name="newPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={t("newPassword")}
            value={formik.values.newPassword}
            error={
              formik.touched.newPassword &&
              formik.values.newPassword &&
              formik.errors.newPassword
            }
          />
          <Input
            name="passwordRetype"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={t("retypePassword")}
            value={formik.values.passwordRetype}
            error={
              formik.touched.passwordRetype &&
              formik.values.passwordRetype &&
              formik.errors.passwordRetype
            }
          />
          {globalError(error)}
          {message ? (
            <>
              <Message
                message={message}
                icon={<FaRegEnvelope size={20} />}
                succes
                full
              />
              <LinkComponent text={t("goToLogin")} link="/auth" />
            </>
          ) : (
            <Button
              text={t("resetPassword")}
              primary
              disabled={!formik.values.passwordRetype}
              loading={formik.isSubmitting}
            />
          )}
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPaswordComponent;
