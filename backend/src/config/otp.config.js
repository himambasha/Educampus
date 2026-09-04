/**
 * OTP configuration.
 * Supports SMS OTP (via Twilio or MSG91) and general OTP behavior settings.
 * Set OTP_PROVIDER in .env to 'twilio' or 'msg91'.
 */

const otpConfig = {
  // Which SMS provider to use: 'twilio' | 'msg91'
  provider: process.env.OTP_PROVIDER || 'twilio',

  // OTP generation settings
  length: parseInt(process.env.OTP_LENGTH, 10) || 6,
  expiryMinutes: parseInt(process.env.OTP_EXPIRY_MINUTES, 10) || 5,
  maxAttempts: parseInt(process.env.OTP_MAX_ATTEMPTS, 10) || 3,
  resendCooldownSeconds: parseInt(process.env.OTP_RESEND_COOLDOWN_SECONDS, 10) || 30,

  // Twilio credentials
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    fromNumber: process.env.TWILIO_FROM_NUMBER,
  },

  // MSG91 credentials (popular for India-based SMS delivery)
  msg91: {
    authKey: process.env.MSG91_AUTH_KEY,
    templateId: process.env.MSG91_TEMPLATE_ID,
    senderId: process.env.MSG91_SENDER_ID,
  },
};

module.exports = otpConfig;
