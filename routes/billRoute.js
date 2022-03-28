const express = require("express");
const {
  requestBill,
  getbillunactive,
  getbillactive,
  updateBill,
  deleteBill,
} = require("../controllers/billController");
const Router = express.Router();

Router.route("/requestbill").post(requestBill);
Router.route("/getbillunactive").get(getbillunactive);
Router.route("/getbillactive").get(getbillactive);
Router.route("/updatebill/:billid").put(updateBill);
Router.route("/deletebill/:billid").delete(deleteBill);
module.exports = Router;
