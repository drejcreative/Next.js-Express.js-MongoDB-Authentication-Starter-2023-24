import dotenv from 'dotenv';
import { LANGUAGE as SRB } from "./language/srb";
import { LANGUAGE as ENG } from "./language/eng";

dotenv.config();

export const CONFIG = {
  TEXT: SRB,
  APP_NAME: 'Application Name',
  DEV: true,
}

