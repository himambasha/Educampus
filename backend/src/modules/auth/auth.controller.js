const authService = require('./auth.service');
const { success, error } = require('../../utils/response.util');

/**
 * POST /api/auth/register
 * Step 1 of registration: validate details, send OTP to mobile.
 * User is NOT created yet - creation happens after OTP verification.
 */
async function register(req, res) {
  try {
    const { name, email, mobile } = req.body;

    await authService.requestOtp({
      identifier: mobile,
      identifierType: 'mobile',
      purpose: 'register',
    });

    // Temporarily stash registration details in the OTP flow via response;
    // client re-submits name/email/mobile again during verify-otp call.
    return success(res, { name, email, mobile }, 'OTP sent to mobile number for verification');
  } catch (err) {
    return error(res, err.message);
  }
}

/**
 * POST /api/auth/login/request-otp
 * Sends OTP to the given email or mobile for login.
 */
async function requestLoginOtp(req, res) {
  try {
    const { email, mobile } = req.body;
    const identifier = email || mobile;
    const identifierType = email ? 'email' : 'mobile';

    // Ensure the account exists before sending OTP
    await authService.findUserForLogin({ email, mobile });

    await authService.requestOtp({ identifier, identifierType, purpose: 'login' });

    return success(res, null, `OTP sent to ${identifierType}`);
  } catch (err) {
    return error(res, err.message);
  }
}

/**
 * POST /api/auth/verify-otp
 * Verifies OTP for either 'login' or 'register' purpose.
 * On success: registers the user (if purpose=register) or logs them in,
 * and returns a JWT.
 */
async function verifyOtp(req, res) {
  try {
    const { email, mobile, otp, purpose, name } = req.body;
    const identifier = email || mobile;

    await authService.verifyOtp({ identifier, otp, purpose });

    let user;
    if (purpose === 'register') {
      user = await authService.registerUser({ name, email, mobile });
    } else {
      user = await authService.findUserForLogin({ email, mobile });
    }

    const token = authService.issueToken(user);

    return success(res, { token, user }, 'Verification successful');
  } catch (err) {
    return error(res, err.message);
  }
}

/**
 * POST /api/auth/resend-otp
 */
async function resendOtp(req, res) {
  try {
    const { email, mobile, purpose } = req.body;
    const identifier = email || mobile;
    const identifierType = email ? 'email' : 'mobile';

    await authService.requestOtp({ identifier, identifierType, purpose });

    return success(res, null, 'OTP resent successfully');
  } catch (err) {
    return error(res, err.message);
  }
}

/**
 * POST /api/auth/logout
 * Stateless JWT logout - client discards the token.
 * If using refresh tokens / token blacklist, invalidate here instead.
 */
async function logout(req, res) {
  try {
    // If maintaining a token blacklist or refresh-token store, clear it here.
    return success(res, null, 'Logged out successfully');
  } catch (err) {
    return error(res, err.message);
  }
}

module.exports = {
  register,
  requestLoginOtp,
  verifyOtp,
  resendOtp,
  logout,
};
