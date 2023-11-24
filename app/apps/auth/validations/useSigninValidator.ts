import { useTranslation } from "next-i18next";
import { string, object } from "yup";

function useSigninValidator() {
  const { t } = useTranslation("common");

  const signUpValidator = object().shape({
    email: string().email(t("validation.email")).required(t("validation.emailRequired")),
    password: string().min(6, t("short")).required(t("validators.password")),
  });
  return signUpValidator;
}
export default useSigninValidator;
