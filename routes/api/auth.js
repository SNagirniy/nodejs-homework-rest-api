const express = require("express");
const router = express.Router();
const { validateRequest } = require("../../Middlewares/validateRequest");
const {
  registrationSchema,
  loginSchema,
  subscriptionSchema,
  resendSchema,
} = require("./validationSchema");
const {
  Register,
  Login,
  logoutUser,
  currentUser,
  updateSubscription,
  confirmEmail,
  resendEmail,
} = require("../../Controlers/auth");
const { auth } = require("../../Middlewares/auth");
const { upload } = require("../../Middlewares/upload");
const { updateAvatar } = require("../../Controlers/avatar");

router.post("/signup", validateRequest(registrationSchema), Register);
router.get("/verify/:verificationToken", confirmEmail);
router.post("/login", validateRequest(loginSchema), Login);
router.post("/logout", auth, logoutUser);
router.get("/current", auth, currentUser);
router.post("/verify", validateRequest(resendSchema), resendEmail);
router.patch(
  "/",
  auth,
  validateRequest(subscriptionSchema),
  updateSubscription
);
router.patch("/avatars", auth, upload.single("avatar"), updateAvatar);

module.exports = router;
