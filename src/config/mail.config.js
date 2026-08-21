const nodemailer = require('nodemailer');

/**
 * Creates and exports a reusable nodemailer transporter.
 * Used for sending emails (e.g. feedback/enquiry acknowledgements,
 * account notifications, etc.)
 *
 * Required .env variables:
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM
 */
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT, 10) || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for port 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection configuration on startup (optional but useful for debugging)
transporter.verify((error) => {
  if (error) {
    console.error('Mail transporter error:', error.message);
  } else {
    console.log('Mail server is ready to send messages');
  }
});

const mailDefaults = {
  from: process.env.MAIL_FROM || '"Educampus" <no-reply@educampus.com>',
};

module.exports = { transporter, mailDefaults };
