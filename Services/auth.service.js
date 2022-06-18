const { Users } = require("../models/userSchema");
const createError = require("../routes/api/error");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const registerUser = async (userData) => {
  const { email, password } = userData;
  const result = await Users.findOne({ email });
  if (result) {
    throw createError(409, "Email in use");
  }

  const newUser = new Users({ email });
  await newUser.setPassword(password);
  const user = newUser.save();

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await Users.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    console.log(user.comparePassword(password));
    throw createError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
  user.token = token;
  await user.save();

  return user;
};

const logoutUser = async (id) => {
  await Users.findByIdAndUpdate(id, { token: null });
};

const authenticateUser = async (token) => {
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    return await Users.findById(id);
  } catch (error) {
    return null;
  }
};

const updateSubscription = async (id, subscription) => {
  return Users.findByIdAndUpdate(id, { subscription }, { new: true });
};

module.exports = {
  registerUser,
  loginUser,
  authenticateUser,
  logoutUser,
  updateSubscription,
};
