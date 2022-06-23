const { Users } = require("../models/userSchema");
const path = require("path");

const updateUser = async (id, avatarURL) => {
  const user = Users.findByIdAndUpdate(id, { avatarURL }, { new: true });
  return user;
};

module.exports = { updateUser };
