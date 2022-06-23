const { Users } = require("../models/userSchema");

const updateUser = async (id, data) => {
  const user = Users.findByIdAndUpdate(id, data, { new: true });
  return user;
};

const findUser = async (filters) => {
  return Users.findOne(filters);
};

module.exports = { updateUser, findUser };
