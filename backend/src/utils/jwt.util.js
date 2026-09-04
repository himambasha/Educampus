const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not set in environment variables. Set it in .env');
}

/**
 * Signs a JWT with the given payload.
 * @param {object} payload - e.g. { userId, email, mobile }
 */
function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifies a JWT and returns its decoded payload.
 * Throws if the token is invalid or expired.
 */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signToken, verifyToken };
