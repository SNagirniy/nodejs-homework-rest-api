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
const BASE_URL = `localhost:${PORT}/api`;

const sendEmail = async (userEmail, code) => {
  const link = `${BASE_URL}/users/verify/${code}`;
  const emailOptions = {
    from: EMAIL,
    to: userEmail,
    subject: "Confirm your email",
    html: `<h4>Click on this link to confirm registration: <a href=${link}>${link}</a></h4>`,
  };

  try {
    const result = await transporter.sendMail(emailOptions);
    console.log(result);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { sendEmail };
