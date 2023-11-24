import { AUTH } from "./eng/auth";
import { BSHARED } from "./eng/backShared";
import { EMAIL } from "./eng/email";
import { VALIDATION } from "./eng/validation";
import { BPROFILE } from "./eng/backProfile";

export const LANGUAGE = {
  ...VALIDATION,
  ...EMAIL,
  ...AUTH,
  ...BSHARED,
  ...BPROFILE
}