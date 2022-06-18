const express = require("express");
const router = express.Router();
const { validateRequest } = require("../../Middlewares/validateRequest");
const {
  registrationSchema,
  loginSchema,
  subscriptionSchema,
} = require("./validationSchema");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  updateSubscription,
} = require("../../Controlers/auth");
const { auth } = require("../../Middlewares/auth");

router.post("/signup", validateRequest(registrationSchema), registerUser);
router.post("/login", validateRequest(loginSchema), loginUser);
router.post("/logout", auth, logoutUser);
router.get("/current", auth, currentUser);
router.patch("/",auth, validateRequest(subscriptionSchema), updateSubscription);

module.exports = router;
