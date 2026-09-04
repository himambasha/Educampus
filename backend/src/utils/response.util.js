/**
 * Standard success response shape:
 * { success: true, message, data }
 */
function success(res, data = null, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

/**
 * Standard error response shape:
 * { success: false, message }
 */
function error(res, message = 'Something went wrong', statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = { success, error };
