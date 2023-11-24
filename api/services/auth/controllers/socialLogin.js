import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import shortid from 'shortid';
import slugify from 'slugify';

import User from '../models/User';
import { CONFIG } from '../../../config/config';

// initialize Google
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Signup with email confirmation
 * @route  POST /api/auth/google-login
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {String} - Return token
 */
const googleLogin = async (req, res) => {
  const { tokenId: idToken } = req.body;
  const user = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email_verified, given_name, family_name, email, jti } = user.payload;
  if (!email_verified) {
    return res
      .status(404)
      .json({ message: CONFIG.TEXT.authB26, field: 'global' });
  }

  try {
    const ourUser = await User.findOne({ email });

    // ===== IF ALREADY EXIST
    if (ourUser) {
      const token = jwt.sign({ _id: ourUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      // send token to client
      return res.status(201).json(token);
    }

    // ===== NEW USER CREATING

    // hash the password
    const hashPassword = await bcrypt.hash(jti, 10);

    // create user
    const newUser = await new User({
      username: `${slugify(given_name).toLowerCase()}-${shortid.generate()}`,
      firstName: given_name,
      lastName: family_name,
      email,
      verified: true,
      password: hashPassword,
    }).save();

    // generate a token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // send token to client
    res.status(201).json(token);
  } catch (error) {
    return res
      .status(500)
      .json({ message: CONFIG.TEXT.auth07, field: 'global' });
  }
};

export { googleLogin };
