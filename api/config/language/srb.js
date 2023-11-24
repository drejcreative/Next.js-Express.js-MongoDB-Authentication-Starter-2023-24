import { BSHARED } from "./srb/backShared";
import { AUTH } from "./srb/auth";
import { EMAIL } from "./srb/email";
import { VALIDATION } from "./srb/validation";
import { BPROFILE } from "./srb/backProfile";

export const LANGUAGE = {
  ...VALIDATION,
  ...EMAIL,
  ...AUTH,
  ...BSHARED,
  ...BPROFILE
}