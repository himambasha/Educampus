const Joi = require('joi');

const createCmsPageSchema = Joi.object({
  title: Joi.string().trim().min(3).max(150).required(),
  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9-]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Slug must only contain lowercase alphanumeric characters and hyphens',
    }),
  content: Joi.string().trim().min(10).required(),
  isActive: Joi.boolean().default(true),
});

const updateCmsPageSchema = Joi.object({
  title: Joi.string().trim().min(3).max(150),
  slug: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[a-z0-9-]+$/),
  content: Joi.string().trim().min(10),
  isActive: Joi.boolean(),
}).min(1); // At least one field must be provided for update

module.exports = {
  createCmsPageSchema,
  updateCmsPageSchema,
};