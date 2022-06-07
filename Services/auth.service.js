const { Users } = require("../models/userSchema");
const createError = require("../routes/api/error");
const bcrypt = require("bcryptjs");

const registerUser = async (userData) => {
  const result = await Users.findOne({ email: userData.email });
  if (result) {
    throw createError(409, "Email in use");
  }
  const { password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await Users.create({ ...userData, password: hashedPassword });

  return user;
};

module.exports = { registerUser };
