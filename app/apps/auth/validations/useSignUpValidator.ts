import { useTranslation } from "next-i18next";
import { string, object, ref, boolean } from "yup";

function useSignUpValidator() {
  const { t } = useTranslation("common");

  const signUpValidator = object().shape({
    email: string().email(t("validation.email")).required(t("validation.emailRequired")),
    firstName: string().required(t("validation.firstNameRequired")),
    lastName: string().required(t("validation.lastNameRequired")),
    password: string().min(6, t("short")).required(t("validation.password")),
    passwordRetype: string()
      .min(6, t("short"))
      .oneOf([ref("password")], t("validation.confirmPasswordError")),
    termsOfUse: boolean().oneOf([true], t("validation.termsOfUse")),
  });
  return signUpValidator;
}
export default useSignUpValidator;
