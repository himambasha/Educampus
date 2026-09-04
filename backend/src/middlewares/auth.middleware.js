const { verifyToken } = require('../utils/jwt.util');
const User = require('../modules/user/user.model');

/**
 * Protects routes by requiring a valid JWT in the Authorization header:
 *   Authorization: Bearer <token>
 *
 * On success, attaches { userId, email, mobile } to req.user.
 * Also checks the user's account status hasn't been blocked by admin.
 */
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in.',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    // Optional but recommended: confirm user still exists and isn't blocked
    const user = await User.findById(decoded.userId).select('status');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists.',
      });
    }

    if (user.status === 'blocked') {
      return res.status(403).json({
        success: false,
        message: 'Your account has been blocked. Contact support.',
      });
    }

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
    });
  }
}

module.exports = authMiddleware;
