const createErrorr = require("../routes/api/error");

const validateRequest = (shcema, message) => {
  return (req, res, next) => {
    const { error } = shcema.validate(req.body);
    if (error) {
      next(createErrorr(400, message));
    }
    next();
  };
};

module.exports = { validateRequest };
