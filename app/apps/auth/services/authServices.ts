import { preparePayload } from "@/utils/communicator/fetcher";
import { CONFIG } from "../../../config";
import { communicator } from "../../../utils/communicator/communicator";
import {
  FormValues,
  IEmail,
  ResetPaswordValues,
  SignUpFormValues,
} from "../interfaces/authInterfaces";

export const getAllUserService = async (payload: string) => {
  const res = await communicator.get(`${CONFIG.API_AUTH}/users`, payload);
  return res;
};

export const getUserByEmailService = async (payload: string) => {
  const res = await communicator.get(
    `${CONFIG.API_AUTH}/email/${payload}`,
    payload
  );
  return res;
};

export const getUserService = async (payload: string) => {
  const res = await communicator.get(`${CONFIG.API_AUTH}/profile`, payload);
  return res;
};

export const signInService = async (data: FormValues) => {
  const res = await communicator.post(`${CONFIG.API_AUTH}/login`, data);
  return res;
};

// export const signInGoogleService = async (data, payload: string) => {
//   const res = await communicator.post(
//     `${CONFIG.API_AUTH}/google-login`,
//     data,
//     preparePayload(payload)
//   );
//   return res;
// };

export const signUpService = async (data: SignUpFormValues) => {
  const res = await communicator.post(`${CONFIG.API_AUTH}/signup`, data);
  return res;
};

// export const signUpServiceProvider = async (data, payload: string) => {
//   const res = await communicator.post(
//     `${CONFIG.API_AUTH}/service-signup`,
//     data,
//     preparePayload(payload)
//   );
//   return res;
// };

export const activateAccountService = async (data: { token: string }) => {
  const res = await communicator.post(`${CONFIG.API_AUTH}/activate`, data);
  return res;
};

export const forgotPasswordService = async (data: IEmail) => {
  const res = await communicator.put(
    `${CONFIG.API_AUTH}/forgot-password`,
    data
  );
  return res;
};

export const resetPasswordService = async (data: ResetPaswordValues) => {
  const res = await communicator.put(`${CONFIG.API_AUTH}/reset-password`, data);
  return res;
};
