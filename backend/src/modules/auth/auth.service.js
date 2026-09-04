const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');

const Otp = require('./auth.model');
const User = require('../user/user.model');
const otpConfig = require('../../config/otp.config');
const { generateOtp } = require('../../utils/otpGenerator');
const { signToken } = require('../../utils/jwt.util');
const { sendSms } = require('../../utils/smsSender.util'); // provider-agnostic SMS sender
const { sendMail } = require('../../utils/mailSender.util'); // wraps mail.config transporter

/**
 * Generates an OTP, hashes it, stores it, and dispatches it via SMS or email.
 */
async function requestOtp({ identifier, identifierType, purpose }) {
  const otp = generateOtp(otpConfig.length);
  const otpHash = await bcrypt.hash(otp, 10);
  const expiresAt = dayjs().add(otpConfig.expiryMinutes, 'minute').toDate();

  await Otp.create({
    identifier,
    identifierType,
    otpHash,
    purpose,
    expiresAt,
  });

  if (identifierType === 'mobile') {
    await sendSms(identifier, `Your Educampus OTP is ${otp}. Valid for ${otpConfig.expiryMinutes} minutes.`);
  } else {
    await sendMail({
      to: identifier,
      subject: 'Your Educampus OTP',
      text: `Your OTP is ${otp}. It is valid for ${otpConfig.expiryMinutes} minutes.`,
    });
  }

  return true;
}

/**
 * Verifies a submitted OTP against the most recent unexpired, unverified record.
 * Throws an Error with a descriptive message on failure.
 */
async function verifyOtp({ identifier, otp, purpose }) {
  const otpRecord = await Otp.findOne({
    identifier,
    purpose,
    isVerified: false,
  }).sort({ createdAt: -1 });

  if (!otpRecord) {
    throw new Error('No active OTP found. Please request a new one.');
  }

  if (otpRecord.expiresAt < new Date()) {
    throw new Error('OTP has expired. Please request a new one.');
  }

  if (otpRecord.attempts >= otpConfig.maxAttempts) {
    throw new Error('Maximum OTP attempts exceeded. Please request a new one.');
  }

  const isMatch = await bcrypt.compare(otp, otpRecord.otpHash);

  if (!isMatch) {
    otpRecord.attempts += 1;
    await otpRecord.save();
    throw new Error('Invalid OTP');
  }

  otpRecord.isVerified = true;
  await otpRecord.save();

  return true;
}

/**
 * Creates a new user after successful OTP verification during registration.
 */
async function registerUser({ name, email, mobile }) {
  const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });

  if (existingUser) {
    throw new Error('A user with this email or mobile already exists');
  }

  const user = await User.create({
    name,
    email,
    mobile,
    isMobileVerified: true,
  });

  return user;
}

/**
 * Finds a user by email or mobile for login, after OTP verification.
 */
async function findUserForLogin({ email, mobile }) {
  const user = await User.findOne(email ? { email } : { mobile });

  if (!user) {
    throw new Error('No account found. Please register first.');
  }

  return user;
}

/**
 * Issues a signed JWT for an authenticated user.
 */
function issueToken(user) {
  return signToken({ userId: user._id, email: user.email, mobile: user.mobile });
}

module.exports = {
  requestOtp,
  verifyOtp,
  registerUser,
  findUserForLogin,
  issueToken,
};
