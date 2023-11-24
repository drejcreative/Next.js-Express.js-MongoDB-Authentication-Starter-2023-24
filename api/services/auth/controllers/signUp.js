import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import shortid from 'shortid';
import sgMail from '@sendgrid/mail';
import slugify from 'slugify';

sgMail.setApiKey(process.env.SENDGRID_API);

// Import Model
import User from '../models/User';
import { emailService } from '../../email/emailService';
import { accountActivationTemplate } from '../helpers/emailTemplates/accountActivation';
import { CONFIG } from '../../../config/config';

/**
 * @route  POST /api/auth/signup
 * @param {Object} req - The request object containing the token sent by the client.
 * @param {Object} res - The response object used to send a response to the client.
 * @returns {Object} - The response object containing a success message and the new token, or an error message.
 */
const signupConfirmEmail = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    //? Check if user exist
    const user = await User.findOne({ email });

    if (user) {
      return res.status(422).json({
        message: `${CONFIG.TEXT.authB17} ${email} ${CONFIG.TEXT.authB18}`,
        field: 'email',
      });
    }

    const token = jwt.sign(
      { firstName, lastName, email: email.trim().toLowerCase(), password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      {
        expiresIn: '15m',
      }
    );

    await emailService(
      email,
      CONFIG.TEXT.authB19,
      accountActivationTemplate(token)
    );

    return res.json({
      message: `${CONFIG.TEXT.authB20} ${email}. ${CONFIG.TEXT.authB21}`,
      token: process.env.NODE_ENV === 'test' ? token : null,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
      field: 'global',
    });
  }
};

/**
 * @route  POST /api/auth/activate
 * @param {Object} req - The request object containing the token sent by the client.
 * @param {Object} res - The response object used to send a response to the client.
 * @returns {Object} - The response object containing a success message and the new token, or an error message.
 */
const accountActivation = async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err) => {
      if (err) {
        return res
          .status(401)
          .json({ message: CONFIG.TEXT.authB22, field: 'global' });
      }
    });

    const { firstName, lastName, email, password } = jwt.decode(token);

    try {
      //? Check if user exist
      const user = await User.findOne({ email });

      if (user) {
        return res.status(422).json({
          message: CONFIG.TEXT.authB23,
          field: 'global',
        });
      }

      // hash the password
      const hashPassword = await bcrypt.hash(password, 10);

      // create user
      const newUser = await new User({
        username: `${slugify(firstName).toLowerCase()}-${shortid.generate()}`,
        verified: true,
        firstName,
        lastName,
        email,
        password: hashPassword,
      }).save();

      // generate a token
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      // send token to client
      return res.status(201).json(token);
    } catch (error) {
      return res.status(500).json({
        message: error,
        field: 'global',
      });
    }
  }

  return res
    .status(401)
    .json({ message: CONFIG.TEXT.authB24, field: 'global' });
};

export { signupConfirmEmail, accountActivation };
