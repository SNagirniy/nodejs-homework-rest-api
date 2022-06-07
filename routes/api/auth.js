const express = require("express");
const router = express.Router();
const { validateRequest } = require("../../Middlewares/validateRequest");
const { registrationSchema } = require("./validationSchema");
const { registerUser } = require("../../Controlers/auth");

router.post("/signup", validateRequest(registrationSchema), registerUser);

module.exports = router;
