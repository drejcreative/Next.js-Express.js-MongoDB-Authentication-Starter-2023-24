export const resetPasswordTemplate = (token) => (`
  <p>Please use the following link to Reset your password</p>
  <p>${process.env.CLIENT_URL}/auth/reset-password?token=${token}</p>
  <hr />
  <p>This email may contain sensitive informations</p>
  <p>${process.env.CLIENT_URL}</p>
`) 