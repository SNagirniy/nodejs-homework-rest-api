const { uploadImage } = require("../Services/imageService");
const { updateUser } = require("../Services/userService");

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const imageURL = await uploadImage(_id, req.file);
    const { avatarURL } = await updateUser(_id, imageURL);
    res.json([avatarURL]);
  } catch (e) {
    next(e);
  }
};

module.exports = { updateAvatar };
