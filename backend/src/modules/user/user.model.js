const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    email: {
      type: String,
      required: true,
      unique: true, // Automatically creates an index
      trim: true,
      lowercase: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true, // Automatically creates an index
      trim: true,
    },

    // URL/path to the uploaded profile picture (local path or S3 URL)
    profilePicture: {
      type: String,
      default: null,
    },

    isMobileVerified: {
      type: Boolean,
      default: false,
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // Account status - allows admin to disable a user without deleting them
    status: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },

    // Role - kept here for future-proofing (admin panel, exam access, etc.)
    role: {
      type: String,
      enum: ['student', 'admin'],
      default: 'student',
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Removed duplicate userSchema.index calls to prevent duplicate schema index warnings

module.exports = mongoose.model('User', userSchema);