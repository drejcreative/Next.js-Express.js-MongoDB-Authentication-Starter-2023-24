export const accountActivationTemplate = (token) => (`
  <p>Please use the following link to activate your account</p>
  <p>${process.env.CLIENT_URL}/auth/activate?token=${token}</p>
  <hr />
  <p>This email may contain sensitive informations</p>
  <p>${process.env.CLIENT_URL}</p>
`) 