const Account = require("../models/Account");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res, next) => {
  var minute;
  if (req.body.money < 20000) {
    minute = Math.floor((req.body.money / 5000) * 60);
  }
  if (req.body.money > 20000 && req.body.money < 100000) {
    minute = Math.floor(req.body.money / 4000) * 60;
  } else {
    minute = Math.floor(req.body.money / 3000) * 60;
  }
  try {
    const account = await Account.create({ ...req.body, minute });
    res.status(200).json({
      status: "success",
      data: { text: "Tạo tài khoản thành công" },
    });
  } catch (err) {
    next(err);
  }
};
