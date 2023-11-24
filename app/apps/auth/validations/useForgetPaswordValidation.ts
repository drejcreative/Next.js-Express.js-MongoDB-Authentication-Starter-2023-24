import { useTranslation } from "next-i18next";
import { string, object } from "yup";

function useForgetPaswordValidation() {
  const { t } = useTranslation("common");

  const forgetPaswordValidation = object().shape({
    email: string().email(t("validation.email")).required(t("validation.emailRequired")),
  });
  return forgetPaswordValidation;
}
export default useForgetPaswordValidation;
