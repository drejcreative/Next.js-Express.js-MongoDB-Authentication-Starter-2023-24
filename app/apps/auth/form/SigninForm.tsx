import React, { useState } from "react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";

import Input from "components/Input/Input";
import { container, item } from "utils/animation/Animation";
import { signInService } from "@/apps/auth/services/authServices";
import LinkComponent from "components/Link/Link";
import Button from "components/Button/Button";
import useSigninValidator from "../validations/useSigninValidator";
import { useAuth } from "../hooks/useAuth";
import { globalError } from "@/components/globalError/globalError";
import { isApiError } from "@/utils/errorHandling";
import { IError } from "@/interface/error";
import { FormValues } from "../interfaces/authInterfaces";

import style from "./Form.module.scss";

const SigninForm = () => {
  const signinValidator = useSigninValidator();
  const { t } = useTranslation("common");
  const [error, setError] = useState<IError | undefined>();
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const submitForm = async (values: FormValues) => {
    try {
      const token = await signInService(values);
      return token;
    } catch (err) {
      throw err;
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinValidator,
    onSubmit: async (values, actions) => {
      console.log(values);

      setLoading(true);
      try {
        const token = await submitForm(values);
        login(token, "/protected");
      } catch (error) {
        // actions.resetForm();
        if (isApiError(error)) {
          if (error.field === "global") {
            setError(error);
          }
          actions.setFieldError(error.field, error.message);
        }
        setLoading(false);
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
        </motion.div>
        {globalError(error)}
        <motion.div variants={item}>
          <div className={style.footer}>
            <div>
              <Button
                text={t("submit")}
                secoundary
                disabled={
                  !formik.values.email ||
                  !formik.values.password ||
                  Object.keys(formik.errors).length > 0
                }
                loading={loading}
              />
            </div>
            <LinkComponent
              text={t("forgotPassword")}
              link="/auth/reset-password"
            />
          </div>
        </motion.div>
      </motion.div>
    </form>
  );
};

export default SigninForm;
