const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const validate = require('../../middlewares/validate.middleware');
const {
  registerSchema,
  loginRequestOtpSchema,
  verifyOtpSchema,
  resendOtpSchema,
} = require('./auth.validation');

// Registration - Step 1: submit details, receive OTP on mobile
router.post('/register', validate(registerSchema), authController.register);

// Login - Step 1: request OTP via email or mobile
router.post(
  '/login/request-otp',
  validate(loginRequestOtpSchema),
  authController.requestLoginOtp
);

// Shared - Step 2: verify OTP (works for both login and register purposes)
router.post('/verify-otp', validate(verifyOtpSchema), authController.verifyOtp);

// Resend OTP (login or register)
router.post('/resend-otp', validate(resendOtpSchema), authController.resendOtp);

// Logout
router.post('/logout', authController.logout);

module.exports = router;
