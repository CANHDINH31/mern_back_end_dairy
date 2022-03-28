const Pc = require("../models/Pc");
const Account = require("../models/Account");

const jwt = require("jsonwebtoken");

exports.activePc = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const pc = await Pc.findOneAndUpdate(
      { number: req.body.number },
      { run: req.body.run, user: userId }
    );
    res.status(200).json({
      status: "success",
      data: { pc },
    });
  } catch (error) {
    res.json(error);
  }
};
exports.openPc = async (req, res, next) => {
  try {
    const pc = await Pc.findOneAndUpdate(
      { number: req.body.number },
      { run: true }
    );
    res.status(200).json({
      status: "success",
      data: { pc },
    });
  } catch (error) {
    res.json(error);
  }
};
exports.clockPc = async (req, res, next) => {
  try {
    const pc = await Pc.findOneAndUpdate(
      { number: req.body.number },
      { run: false, $unset: { user: "" } }
    );
    res.status(200).json({
      status: "success",
      data: { pc },
    });
  } catch (error) {
    res.json(error);
  }
};
exports.signOutPc = async (req, res, next) => {
  try {
    const pc = await Pc.findOneAndUpdate(
      { number: req.body.number },
      { run: false, $unset: { user: "" } }
    );
    res.status(200).json({
      status: "success",
      data: { pc },
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getAllPc = async (req, res, next) => {
  try {
    const pcs = await Pc.find()
      .populate("user", "username")
      .select("number run user");

    res.status(200).json({
      status: "success",
      results: pcs.length,
      data: { pcs },
    });
  } catch (error) {
    res.json(error);
  }
};
