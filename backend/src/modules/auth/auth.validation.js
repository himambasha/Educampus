const Joi = require('joi');

// Basic reusable patterns
const mobilePattern = /^[6-9]\d{9}$/; // adjust for your target country format
const otpPattern = /^\d{4,8}$/;

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().trim().email().required(),
  mobile: Joi.string().trim().pattern(mobilePattern).required().messages({
    'string.pattern.base': 'Mobile number must be a valid 10-digit number',
  }),
});

const loginRequestOtpSchema = Joi.object({
  // User can login with either email or mobile - one of them required
  email: Joi.string().trim().email(),
  mobile: Joi.string().trim().pattern(mobilePattern),
})
  .xor('email', 'mobile')
  .messages({
    'object.xor': 'Provide either email or mobile, not both',
  });

const verifyOtpSchema = Joi.object({
  email: Joi.string().trim().email(),
  mobile: Joi.string().trim().pattern(mobilePattern),
  otp: Joi.string().trim().pattern(otpPattern).required(),
  purpose: Joi.string().valid('login', 'register').required(),
})
  .xor('email', 'mobile')
  .messages({
    'object.xor': 'Provide either email or mobile, not both',
  });

const resendOtpSchema = Joi.object({
  email: Joi.string().trim().email(),
  mobile: Joi.string().trim().pattern(mobilePattern),
  purpose: Joi.string().valid('login', 'register').required(),
})
  .xor('email', 'mobile')
  .messages({
    'object.xor': 'Provide either email or mobile, not both',
  });

module.exports = {
  registerSchema,
  loginRequestOtpSchema,
  verifyOtpSchema,
  resendOtpSchema,
};
