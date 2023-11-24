export interface FormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordRetype: string;
}

export interface IEmail {
  email: string;
}

export interface ResetPaswordValues {
  resetPaswordLink: string;
  newPassword: string;
  passwordRetype: string;
}
