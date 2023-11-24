import expressJwt from 'express-jwt';

import { CONFIG } from '../../../config/config';
import User from '../models/User';

// Check token and get user _id
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
});

// Return user profile Middleware
export const authMiddleware = async (req, res, next) => {
  const authUserId = req.user._id;
  try {
    const user = await User.findById({ _id: authUserId });

    if (!user) {
      res.status(400).json({
        message: CONFIG.TEXT.bShared01,
        field: 'global',
      });
    }

    req.profile = user;
    next();
  } catch (error) {
    res.status(400).json({
      message: CONFIG.TEXT.bShared02,
      field: 'global',
    });
  }
};

// Auth Middleware
export const adminMiddleware = async (req, res, next) => {
  const authUserId = req.user._id;

  try {
    const user = await User.findById({ _id: authUserId });
    if (!user) {
      res.status(400).json({
        message: CONFIG.TEXT.bShared01,
        field: 'global',
      });
    }

    if (user.role !== 'admin') {
      res.status(400).json({
        message: CONFIG.TEXT.bShared03,
        field: 'global',
      });
    }

    req.profile = user;
    next();
  } catch (error) {
    res.status(400).json({
      message: CONFIG.TEXT.bShared02,
      field: 'global',
    });
  }
};

// To read profile data after previous middleware
export const readProfileMiddleware = (req, res) => {
  return res.json(req.profile);
};
