const authService = require("../Services/auth.service");

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    res.json({ email: user.email, subscription: user.subscription });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser };
