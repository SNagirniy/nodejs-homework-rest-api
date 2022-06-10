const authService = require("../Services/auth.service");

const registerUser = async (req, res, next) => {
  try {
    const { email, subscription } = await authService.registerUser(req.body);
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { token, email, subscription } = await authService.loginUser(
      req.body
    );
    res.json({ token, user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    await authService.logoutUser(req.user._id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const { email, subscription } = req.user;
    res.status(201).json({ user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, logoutUser, currentUser };
