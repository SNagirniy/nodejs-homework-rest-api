const multer = require("multer");
const createError = require("../routes/api/error");
const { TEMP } = require("../helpers/consts");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else cb(createError(400, "Wrong format"));
  },
});

module.exports = { upload };
