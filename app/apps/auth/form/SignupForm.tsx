import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import { FaRegEnvelope } from "react-icons/fa";

import Input from "components/Input/Input";
import SubText from "components/Input/SubText";
import Button from "components/Button/Button";
import { container, item } from "utils/animation/Animation";
import { signUpService } from "@/apps/auth/services/authServices";
import Message from "components/message/Message";
import useSignUpValidator from "../validations/useSignUpValidator";
import Checkbox from "components/Checkbox/Checkbox";
import { globalError } from "@/components/globalError/globalError";
import { isApiError } from "@/utils/errorHandling";
import { IError } from "@/interface/error";
import { SignUpFormValues } from "../interfaces/authInterfaces";

import style from "./Form.module.scss";

const SignupForm = () => {
  const [message, setMessage] = useState("");
  const { t } = useTranslation("common");
  const signUpValidator = useSignUpValidator();
  const [error, setError] = useState<IError | undefined>();

  const submitForm = async (values: SignUpFormValues) => {
    try {
      const res = await signUpService(values);
      return res;
    } catch (err) {
      throw err;
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      passwordRetype: "",
      termsOfUse: false,
    },
    validationSchema: signUpValidator,
    onSubmit: async (values, actions) => {
      try {
        const res = await submitForm(values);
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
    <form onSubmit={formik.handleSubmit}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={style.form}
      >
        <motion.div variants={item}>
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
        </motion.div>
        <div className={style.formInLines}>
          <motion.div variants={item}>
            <Input
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label={t("name")}
              value={formik.values.firstName}
              error={
                formik.touched.firstName &&
                formik.values.firstName &&
                formik.errors.firstName
              }
            />
          </motion.div>
          <motion.div variants={item}>
            <Input
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label={t("surname")}
              value={formik.values.lastName}
              error={
                formik.touched.lastName &&
                formik.values.lastName &&
                formik.errors.lastName
              }
            />
          </motion.div>
        </div>
        <motion.div variants={item}>
          <Input
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={t("password")}
            value={formik.values.password}
            error={
              formik.touched.password &&
              formik.values.password &&
              formik.errors.password
            }
          />
          <SubText dark>{t("passwordDescription")}</SubText>
        </motion.div>
        <motion.div variants={item}>
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
        </motion.div>
        <motion.div variants={item} className={style.checkbox}>
          <Checkbox
            label="Term of use"
            name="termsOfUse"
            onChange={formik.handleChange}
            value={formik.values.termsOfUse}
          />
        </motion.div>

        {!!message && (
          <Message message={message} icon={<FaRegEnvelope />} succes full />
        )}

        {globalError(error)}

        <motion.div variants={item}>
          <div className={style.footer}>
            <Button
              text={t("signUp")}
              secoundary
              disabled={
                !formik.touched.email ||
                !formik.touched.password ||
                !formik.touched.passwordRetype ||
                Object.keys(formik.errors).length > 0
              }
              loading={formik.isSubmitting}
            />
          </div>
        </motion.div>
      </motion.div>
    </form>
  );
};

export default SignupForm;
