const nodemailer = require("nodemailer");

require("dotenv").config();
const { EMAIL, APP_PASSWORD, PORT } = process.env;

const config = {
  service: "Gmail",
  auth: {
    user: EMAIL,
    pass: APP_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);
const BASE_URL = `http://localhost:${PORT}/api`;

const sendEmail = async (userEmail, code) => {
  const link = `${BASE_URL}/users/verify/${code}`;
  const emailOptions = {
    from: EMAIL,
    to: userEmail,
    subject: "Confirm your email",
    html: `<h4>Click on this link to confirm registration: ${link}</h4>`,
  };

  try {
    await transporter.sendMail(emailOptions);
  } catch (error) {
    throw error;
  }
};

module.exports = { sendEmail };
