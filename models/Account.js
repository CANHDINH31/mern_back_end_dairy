const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String, minlength: [3, "Mật khẩu có tối thiểu 3 kí tự"] },
    minute: { type: String },
    money: { type: String },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);
module.exports = Account;
