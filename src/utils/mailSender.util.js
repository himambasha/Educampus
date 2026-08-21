const { transporter, mailDefaults } = require('../config/mail.config');
const logger = require('./logger');

/**
 * Sends an email using the configured SMTP transporter.
 *
 * @param {object} options
 * @param {string} options.to - recipient email address
 * @param {string} options.subject
 * @param {string} options.text - plain text body
 * @param {string} [options.html] - optional HTML body
 */
async function sendMail({ to, subject, text, html }) {
  try {
    await transporter.sendMail({
      from: mailDefaults.from,
      to,
      subject,
      text,
      html,
    });
    logger.info(`Email sent to ${to}: ${subject}`);
  } catch (err) {
    logger.error(`Failed to send email to ${to}: ${err.message}`);
    throw new Error('Failed to send email. Please try again.');
  }
}

module.exports = { sendMail };
