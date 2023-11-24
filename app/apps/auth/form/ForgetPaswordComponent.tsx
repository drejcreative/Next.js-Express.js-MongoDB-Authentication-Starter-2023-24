import React, { useState } from "react";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { FaRegEnvelope } from "react-icons/fa";
import Image from "next/image";

import Button from "components/Button/Button";
import Input from "components/Input/Input";
import Message from "components/message/Message";
import { forgotPasswordService } from "@/apps/auth/services/authServices";
import useForgetPaswordValidation from "../validations/useForgetPaswordValidation";
import AuthLayout from "../components/AuthLayout";
import { isApiError } from "@/utils/errorHandling";
import { IEmail } from "../interfaces/authInterfaces";

import styles from "../ActivateComponent.module.scss";

const ForgetPaswordComponent = () => {
  const { t } = useTranslation("common");
  const [message, setMessage] = useState("");
  const forgetPaswordValidator = useForgetPaswordValidation();

  const resetPassword = async (values: IEmail) => {
    try {
      const res = await forgotPasswordService(values);
      return res;
    } catch (err) {
      throw err;
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgetPaswordValidator,
    onSubmit: async (values, actions) => {
      try {
        const res = await resetPassword(values);
        actions.resetForm();
        setMessage(res.message);
      } catch (error) {
        if (isApiError(error)) {
          actions.setFieldError("email", error.message);
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
          <p>{t("resetEmailText")}</p>
          <Input
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={t("email")}
            value={formik.values.email}
            error={
              formik.touched.email && formik.values.email && formik.errors.email
            }
          />
          {message ? (
            <Message
              message={message}
              icon={<FaRegEnvelope size={20} />}
              succes
              full
            />
          ) : (
            <Button
              text={`${t("sendPasswordLink")} ${formik.values.email}`}
              primary
              loading={formik.isSubmitting}
              disabled={!!(!formik.values.email || formik.errors.email)}
            />
          )}
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgetPaswordComponent;
