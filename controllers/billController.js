const Bill = require("../models/Bill");
const Account = require("../models/Account");

exports.requestBill = async (req, res, next) => {
  try {
    const bill = await Bill.create({ ...req.body });
    res.status(200).json({
      status: "success",
      data: { text: "Gởi yêu cầu thành công" },
    });
  } catch (err) {
    next(err);
  }
};
exports.getbillunactive = async (req, res, next) => {
  try {
    const bill = await Bill.find({ proccess: false });
    res.status(200).json({
      status: "success",
      data: { bill },
      length: bill.length,
    });
  } catch (err) {
    next(err);
  }
};
exports.getbillactive = async (req, res, next) => {
  try {
    const bill = await Bill.find({ proccess: true }).sort({ updatedAt: -1 });
    res.status(200).json({
      status: "success",
      data: { bill },
      length: bill.length,
    });
  } catch (err) {
    next(err);
  }
};
exports.updateBill = async (req, res, next) => {
  const billid = req.params.billid;
  const total = req.body.total;
  const username = req.body.username;

  try {
    const updateBill = await Bill.findByIdAndUpdate(billid, {
      product: req.body.product,
      proccess: true,
    });
    const account = await Account.find({ username: username });
    const newMoney = Number(account[0].money) + Number(total);
    const updateAccount = await Account.findOneAndUpdate(
      { username: username },
      {
        money: newMoney,
      }
    );
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
exports.deleteBill = async (req, res, next) => {
  const billid = req.params.billid;

  try {
    const billid = req.params.billid;

    await Bill.findByIdAndDelete(billid);

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};
