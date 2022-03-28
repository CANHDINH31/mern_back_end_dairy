const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String, minlength: [3, "Mật khẩu có tối thiểu 3 kí tự"] },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
