const express = require("express");
const router = express.Router();
const { validateRequest } = require("../../Middlewares/validateRequest");
const { registrationSchema, loginSchema } = require("./validationSchema");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../../Controlers/auth");
const { auth } = require("../../Middlewares/auth");

router.post("/signup", validateRequest(registrationSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/logout", auth, logoutUser);
router.get("/current", auth, currentUser);

module.exports = router;
