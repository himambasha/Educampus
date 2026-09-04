const crypto = require('crypto');

/**
 * Generates a numeric OTP of the given length using a cryptographically
 * secure random number generator (avoids predictable Math.random()).
 *
 * @param {number} length - number of digits (default 6)
 * @returns {string} OTP, e.g. "482913"
 */
function generateOtp(length = 6) {
  if (length < 4 || length > 10) {
    throw new Error('OTP length must be between 4 and 10 digits');
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  const otp = crypto.randomInt(min, max + 1);

  return otp.toString();
}

module.exports = { generateOtp };
