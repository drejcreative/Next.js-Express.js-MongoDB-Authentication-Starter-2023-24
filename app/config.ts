export const CONFIG = {
  API_AUTH: process.env.PRODUCTION ? '' : 'http://localhost:5000/api/auth',
  SITE_NAME: 'Auth Service',
}