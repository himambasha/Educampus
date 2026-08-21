const Joi = require('joi');

/**
 * Used for PATCH /api/user/profile
 * Only name is updatable via this schema - profile picture is handled
 * separately via multipart file upload (see upload.middleware.js).
 */
const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
});

module.exports = {
  updateProfileSchema,
};
