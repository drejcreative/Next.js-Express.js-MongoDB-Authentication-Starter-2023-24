import { useTranslation } from "next-i18next";
import { string, object, ref } from "yup";

function useResetPasswordValidator() {
  const { t } = useTranslation("common");

  const resetPasswordValidator = object().shape({
    newPassword: string().min(6, t("short")).required(t("validation.password")),
    passwordRetype: string()
      .min(6, t("short"))
      .oneOf([ref("newPassword")], t("validation.confirmPasswordError")),
  });
  return resetPasswordValidator;
}
export default useResetPasswordValidator;
