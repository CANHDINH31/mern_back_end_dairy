const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Name must be required"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Email must be required"],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password must be required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
  },
  { timestamps: true }
);
userScheme.pre("save", function (next) {
  let user = this;

  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    } else {
      user.password = hash;
      next();
    }
  });
});
const User = mongoose.model("User", userScheme);
module.exports = User;
