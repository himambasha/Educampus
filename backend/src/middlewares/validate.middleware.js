/**
 * Returns an Express middleware that validates req.body against the given Joi schema.
 * On failure, responds with 400 and a readable error message.
 * On success, replaces req.body with the validated/sanitized value.
 *
 * Usage: router.post('/register', validate(registerSchema), controller.register);
 */
function validate(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // collect all errors, not just the first
      stripUnknown: true, // remove fields not defined in the schema
    });

    if (error) {
      const message = error.details.map((detail) => detail.message).join(', ');
      return res.status(400).json({
        success: false,
        message,
      });
    }

    req.body = value;
    next();
  };
}

module.exports = validate;
