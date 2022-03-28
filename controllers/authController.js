const Account = require("../models/Account");
const Admin = require("../models/Admin");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  try {
    const account = await Account.findOne({ username: req.body.username });
    if (!account) {
      const err = new Error("username không đúng");
      err.statusCode = 400;
      return next(err);
    }
    if (req.body.password == account.password) {
      const token = jwt.sign({ userId: account._id }, process.env.APP_SECRET);
      res.status(200).json({
        status: "success",
        data: {
          token,
          userName: account.username,
          minute: account.minute,
          id: account._id,
        },
      });
    } else {
      const err = new Error("Password không đúng");
      err.statusCode = 400;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};
exports.loginAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findOne({ username: req.body.username });
    if (!admin) {
      const err = new Error("username không đúng");
      err.statusCode = 400;
      return next(err);
    }
    if (req.body.password == admin.password) {
      res.status(200).json({
        status: "success",
        data: {
          adminName: admin.username,
        },
      });
    } else {
      const err = new Error("Password không đúng");
      err.statusCode = 400;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
};

//get Current user
exports.getCurrentUser = async (req, res, next) => {
  try {
    const data = { user: null };
    if (req.user) {
      const user = await User.findOne({ _id: req.user.userId });
      data.user = { userName: user.name };
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getTopAccount = async (req, res, next) => {
  try {
    const account = await Account.find({}).limit(10).sort({ money: -1 });

    res.status(200).json({
      status: "success",
      length: account.length,
      data: { account },
    });
  } catch (error) {
    next(error);
  }
};
exports.getSearchAccount = async (req, res, next) => {
  try {
    const account = await Account.find({ username: req.params.account });

    res.status(200).json({
      status: "success",
      size: account.length,
      data: { account },
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteAccount = async (req, res, next) => {
  try {
    const id = req.params.userid;

    await Account.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Account has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
exports.updateAccount = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const account = await Account.findOne({ _id: userid });

    if (req.body.oldpassword == account.password) {
      if (req.body.newpassword == req.body.renewpassword) {
        const updateAccount = await Account.findByIdAndUpdate(userid, {
          password: req.body.newpassword,
        });
        res.status(200).json({
          status: "success",
          data: {
            data: "Đổi mật khẩu thành công",
          },
        });
      } else {
        res.status(200).json({
          status: "fail",
          data: {
            data: "Password mới nhập lại không khớp",
          },
        });
      }
    } else {
      res.status(200).json({
        status: "fail",
        data: {
          data: "Password cũ không đúng",
        },
      });
    }
  } catch (error) {
    // res.json(error);
    next(error);
  }
};
exports.updateMinuteAccount = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const updateAccount = await Account.findByIdAndUpdate(userid, {
      minute: req.body.minute,
    });
    res.status(200).json({
      status: "success",
      data: {
        data: updateAccount,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.reCharge = async (req, res, next) => {
  const userid = req.params.userid;
  var addminute;
  if (req.body.money < 20000) {
    addminute = Math.floor((req.body.money / 5000) * 60);
  }
  if (req.body.money > 20000 && req.body.money < 100000) {
    addminute = Math.floor(req.body.money / 4000) * 60;
  } else {
    addminute = Math.floor(req.body.money / 3000) * 60;
  }

  try {
    const account = await Account.find({ _id: userid });
    const newMinute = Number(account[0].minute) + addminute;
    const newMoney = Number(account[0].money) + Number(req.body.money);

    const updateAccount = await Account.findByIdAndUpdate(userid, {
      minute: newMinute,
      money: newMoney,
    });

    const newAccount = await Account.find({ _id: userid });
    res.status(200).json({
      status: "success",
      data: { newAccount },
    });
  } catch (err) {
    next(err);
  }
};
