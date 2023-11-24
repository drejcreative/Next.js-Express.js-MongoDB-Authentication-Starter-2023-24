import express from 'express';
const router = express.Router();

// validation
import { runValidation } from '../validators';
import {
  userSignUpValidator,
  userLoginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
} from '../validators/auth';
import {
  requireSignin,
  authMiddleware,
  readProfileMiddleware,
  adminMiddleware,
} from '../helpers/authMiddleware';

import { signin } from '../controllers/signIn';
import { getAllUser, getUser, getUserByEmail } from '../controllers/getUsers';
import { signupConfirmEmail, accountActivation } from '../controllers/signUp';
import {
  forgotPassword,
  resetPassword,
} from '../controllers/forgotResetPassword';
import { googleLogin } from '../controllers/socialLogin';

router.route('/users').get(requireSignin, adminMiddleware, getAllUser);

router
  .route('/profile')
  .get(requireSignin, authMiddleware, readProfileMiddleware);

router.route('/public/:username').get(getUser);

router.route('/email/:email').get(getUserByEmail);

router
  .route('/signup')
  .post(userSignUpValidator, runValidation, signupConfirmEmail);

router.route('/login').post(userLoginValidator, runValidation, signin);

router.route('/google-login').post(googleLogin);

router.route('/activate').post(accountActivation);

router
  .route('/forgot-password')
  .put(forgotPasswordValidator, runValidation, forgotPassword);

router
  .route('/reset-password')
  .put(resetPasswordValidator, runValidation, resetPassword);

export default router;
