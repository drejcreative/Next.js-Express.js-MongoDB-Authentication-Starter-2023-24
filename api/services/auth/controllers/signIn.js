import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { CONFIG } from '../../../config/config';

// Import Model
import User from '../models/User';

/**
 * @route  POST /api/auth/login
 * @param {Object} req - The request object containing the user's email and password.
 * @param {Object} res - The response object to send back to the client.
 * @returns {Object} - The response object with a JSON web token or an error message.
 */
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // check if user exist
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select('+password');

    if (!user) {
      return res.status(404).json({
        message: CONFIG.TEXT.authB14,
        field: 'email',
      });
    }

    // check if password is correct
    const paswordsMatch = await bcrypt.compare(password, user.password);
    if (!paswordsMatch) {
      return res
        .status(401)
        .json({ message: CONFIG.TEXT.authB15, field: 'password' });
    }

    // generate a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // send token to client
    return res.status(201).json(token);
  } catch (error) {
    res.status(500).json({ message: CONFIG.TEXT.authB16, field: 'global' });
  }
};

export { signin };
