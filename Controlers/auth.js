const authService = require("../Services/auth.service");
const { sendEmail } = require("../Services/email.service");
const { findUser, updateUser } = require("../Services/userService");
const createError = require("../routes/api/error");

const Register = async (req, res, next) => {
  try {
    const { email, subscription, verificationToken } =
      await authService.registerUser(req.body);
    await sendEmail(email, verificationToken);
    return res.status(201).json({ code: 201, user: { email, subscription } });
  } catch (error) {
    next(error);
  }
};
const confirmEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await findUser({ verificationToken });
    if (!user) {
      throw createError(404, "User not found");
    }

    await updateUser(user._id, { verificationToken: null, verify: true });

    return res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

const resendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUser({ email });
    if (!user) {
      throw createError(404, "User not found");
    }
    if (user.verify) {
      throw createError(400, "Verification has already been passed");
    }
    await sendEmail(user.email, user.verificationToken);
    res.status(200).json({ message: "Verification email sent" });
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
  confirmEmail,
  logoutUser,
  currentUser,
  updateSubscription,
  resendEmail,
};
