const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: () => {
        return gravatar.url(this.email, {
          protocol: "https",
          s: "250",
        });
      },
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.methods.setPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Users = model("user", userSchema);

module.exports = { Users };
