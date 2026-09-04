const mongoose = require('mongoose');

/**
 * Tracks OTPs sent to users for login or registration verification.
 * Kept separate from the User model so OTP records can expire independently
 * and support multiple OTP requests (login, register, resend) per user.
 */
const otpSchema = new mongoose.Schema(
  {
    // Identifier the OTP was sent to - email or mobile number
    identifier: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    // Type of identifier: 'email' | 'mobile'
    identifierType: {
      type: String,
      enum: ['email', 'mobile'],
      required: true,
    },

    // Hashed OTP (never store plain OTP in DB)
    otpHash: {
      type: String,
      required: true,
    },

    // Purpose: 'login' | 'register' | 'resend'
    purpose: {
      type: String,
      enum: ['login', 'register', 'resend'],
      required: true,
    },

    // Number of verification attempts made against this OTP
    attempts: {
      type: Number,
      default: 0,
    },

    // Whether this OTP has already been successfully verified/used
    isVerified: {
      type: Boolean,
      default: false,
    },

    // TTL field - MongoDB will auto-delete expired OTP docs
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// Auto-delete expired OTP documents from MongoDB
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Otp', otpSchema);
