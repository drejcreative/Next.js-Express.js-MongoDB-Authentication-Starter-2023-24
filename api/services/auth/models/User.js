import mongoose from 'mongoose';

const { String, Boolean } = mongoose.Schema.Types;

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      max: 32,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      trim: true,
      max: 80,
    },
    lastName: {
      type: String,
      trim: true,
      max: 80,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin', 'moderator'],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    photo: {
      type: String,
    },
    resetPaswordLink: {
      data: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// const User = mongoose.models.User || mongoose.model('User', userSchema);
export default mongoose.model('User', userSchema);
