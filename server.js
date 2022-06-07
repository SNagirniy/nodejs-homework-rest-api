const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();
const { DB_URL, PORT } = process.env;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .then(() => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
