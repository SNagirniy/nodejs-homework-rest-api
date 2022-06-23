const authService = require("../Services/auth.service");

const Register = async (req, res, next) => {
  try {
    const { email, subscription } = await authService.registerUser(req.body);
    return res.status(201).json({ code: 201, user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};

const Login = async (req, res, next) => {
  try {
    const { token, email, subscription, avatarURL } =
      await authService.loginUser(req.body);
    return res.json({
      code: 200,
      token,
      user: { email, subscription, avatarURL },
    });
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

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await authService.updateSubscription(_id, subscription);
    res.json({
      user: { email: result.email, subscription: result.subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  Register,
  Login,
  logoutUser,
  currentUser,
  updateSubscription,
};
