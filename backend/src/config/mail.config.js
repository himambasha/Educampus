const nodemailer = require('nodemailer');

/**
 * Creates and exports a reusable nodemailer transporter.
 * Used for sending emails (e.g. feedback/enquiry acknowledgements,
 * account notifications, etc.)
 *
 * Required .env variables:
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM
 */
// Example fallback inside src/config/mail.config.js
const transporter = nodemailer.createTransport(
  process.env.SMTP_USER
    ? {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      }
    : {
        // Fallback JSON Transport prints emails to console instead of sending
        jsonTransport: true,
      }
);

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
