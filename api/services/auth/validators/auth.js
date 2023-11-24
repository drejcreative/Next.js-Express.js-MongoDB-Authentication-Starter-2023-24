import { check } from 'express-validator';
import { CONFIG } from '../../../config/config';

const userSignUpValidator = [
  check('email').isEmail().withMessage(CONFIG.TEXT.validation01),
  check('firstName').not().isEmpty().withMessage(CONFIG.TEXT.validation02),
  check('lastName').not().isEmpty().withMessage(CONFIG.TEXT.validation03),
  check('password').isLength({ min: 6 }).withMessage(CONFIG.TEXT.validation05),
];

const userLoginValidator = [
  check('email').isEmail().withMessage(CONFIG.TEXT.validation1),
  check('password').isLength({ min: 6 }).withMessage(CONFIG.TEXT.validation5),
];

const forgotPasswordValidator = [
  check('email').isEmail().withMessage(CONFIG.TEXT.validation1),
];

const resetPasswordValidator = [
  check('newPassword')
    .not()
    .isEmpty()
    .isLength({ min: 6 })
    .withMessage(CONFIG.TEXT.validation5),
];

export {
  userSignUpValidator,
  userLoginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
};
