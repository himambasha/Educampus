const multer = require('multer');
const logger = require('../utils/logger');

/**
 * Centralized error handler - place LAST in the middleware chain (in app.js).
 * Catches errors thrown/passed via next(err) from anywhere in the app,
 * including multer upload errors and uncaught async errors.
 */
function errorMiddleware(err, req, res, next) {
  logger.error(err.stack || err.message);

  // Multer-specific errors (file too large, wrong field name, etc.)
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
    });
  }

  // Mongoose validation errors
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((e) => e.message)
      .join(', ');
    return res.status(400).json({ success: false, message });
  }

  // Mongoose duplicate key errors (e.g. unique email/mobile)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      message: `${field} already exists`,
    });
  }

  // Fallback - generic 500
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
}

module.exports = errorMiddleware;
