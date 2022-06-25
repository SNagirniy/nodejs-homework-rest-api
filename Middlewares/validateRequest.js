const createErrorr = require("../routes/api/error");

const validateRequest = (schema, message = null) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const messageSource = message || error.message;
      next(createErrorr(400, messageSource));
    }
    next();
  };
};

module.exports = { validateRequest };
