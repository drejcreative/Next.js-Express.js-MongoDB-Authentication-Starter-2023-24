// Import Model
import User from '../models/User';
import { CONFIG } from '../../../config/config';

//=============================================
// @desc   Get all getUser from Auth
// @route  GET /api/auth/users
//=============================================
const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(201).json(users);
  } catch (error) {
    res.status(500).json({ message: CONFIG.TEXT.authB13, field: 'global' });
  }
};

//=============================================
// @desc   Get One User Data by Username
// @route  GET /api/auth/public/:username
//=============================================
const getUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select(['-email']);

    if (user.role === 'admin') {
      return res.status(400).json({});
    }
    return res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: CONFIG.TEXT.authB14, field: 'global' });
  }
};

//=============================================
// @desc   Get One User Data by Email
// @route  GET /api/auth/email/:email
//=============================================
const getUserByEmail = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email }).select(['-email']);

    if (user.role === 'admin') {
      return res.status(400).json({});
    }
    return res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: CONFIG.TEXT.authB14, field: 'global' });
  }
};

export { getAllUser, getUser, getUserByEmail };
