const otpConfig = require('../config/otp.config');
const logger = require('./logger');

/**
 * Sends an SMS using whichever provider is configured (Twilio or MSG91).
 * Keeps provider-specific code isolated so auth.service.js just calls sendSms().
 *
 * @param {string} mobile - recipient mobile number (with country code if required by provider)
 * @param {string} message - SMS body text
 */
async function sendSms(mobile, message) {
  if (otpConfig.provider === 'twilio') {
    return sendViaTwilio(mobile, message);
  }

  if (otpConfig.provider === 'msg91') {
    return sendViaMsg91(mobile, message);
  }

  throw new Error(`Unsupported OTP provider: ${otpConfig.provider}`);
}

async function sendViaTwilio(mobile, message) {
  const twilio = require('twilio')(
    otpConfig.twilio.accountSid,
    otpConfig.twilio.authToken
  );

  try {
    await twilio.messages.create({
      body: message,
      from: otpConfig.twilio.fromNumber,
      to: mobile,
    });
    logger.info(`SMS sent via Twilio to ${mobile}`);
  } catch (err) {
    logger.error(`Twilio SMS failed for ${mobile}: ${err.message}`);
    throw new Error('Failed to send SMS. Please try again.');
  }
}

async function sendViaMsg91(mobile, message) {
  const axios = require('axios');

  try {
    await axios.post(
      'https://api.msg91.com/api/v5/flow/',
      {
        template_id: otpConfig.msg91.templateId,
        sender: otpConfig.msg91.senderId,
        mobiles: mobile,
        message,
      },
      {
        headers: {
          authkey: otpConfig.msg91.authKey,
          'Content-Type': 'application/json',
        },
      }
    );
    logger.info(`SMS sent via MSG91 to ${mobile}`);
  } catch (err) {
    logger.error(`MSG91 SMS failed for ${mobile}: ${err.message}`);
    throw new Error('Failed to send SMS. Please try again.');
  }
}

module.exports = { sendSms };
