import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User';
import { emailService } from '../../email/emailService';
import { resetPasswordTemplate } from '../helpers/emailTemplates/resetPassword';
import { CONFIG } from '../../../config/config';

/**
 * Forgot password route
 * @route  PUT /api/auth/forgot-password
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object to send back to the client.
 * @returns {Object} - The response object with a JSON web token or an error message.
 */
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: `${CONFIG.TEXT.authB01} ${email} ${CONFIG.TEXT.authB02}`,
        field: 'global',
      });
    }

    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: '15m',
      }
    );

    try {
      // Update Reset password link in DB
      await user.updateOne({ resetPaswordLink: token });

      // SEND TOKEN BY EMAIL
      emailService(email, CONFIG.TEXT.authB03, resetPasswordTemplate(token));

      // Response
      return res.json({
        message: `${CONFIG.TEXT.authB04} ${email}. ${CONFIG.TEXT.authB05}`,
        field: 'global',
      });
    } catch (error) {
      return res
        .status(401)
        .json({ message: CONFIG.TEXT.authB06, field: 'global' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: CONFIG.TEXT.authB07, field: 'global' });
  }
};

/**
 * Reset password route
 * @route  PUT /api/auth/reset-password
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object to send back to the client.
 * @returns {Object} - The response object with a JSON web token or an error message.
 */
const resetPassword = async (req, res) => {
  const { resetPaswordLink, newPassword } = req.body;

  if (!resetPaswordLink) {
    return res
      .status(500)
      .json({ message: CONFIG.TEXT.authB08, field: 'global' });
  }

  jwt.verify(resetPaswordLink, process.env.JWT_ACCOUNT_ACTIVATION, (err) => {
    if (err) {
      return res
        .status(401)
        .json({ message: CONFIG.TEXT.authB09, field: 'global' });
    }
  });

  try {
    const user = await User.findOne({ resetPaswordLink });

    // hash the password
    const hashPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashPassword;
    user.resetPaswordLink = '';

    try {
      await user.save();
      // Response
      return res.json({
        message: CONFIG.TEXT.authB10,
        field: 'global',
      });
    } catch (error) {
      return res
        .status(401)
        .json({ message: CONFIG.TEXT.authB11, field: 'global' });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: CONFIG.TEXT.authB12, field: 'global' });
  }
};

export { forgotPassword, resetPassword };
