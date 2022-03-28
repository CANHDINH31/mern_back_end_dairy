const express = require("express");
const {
  login,
  getCurrentUser,
  getTopAccount,
  getSearchAccount,
  deleteAccount,
  updateAccount,
  loginAdmin,
  updateMinuteAccount,
  reCharge,
} = require("../controllers/authController");
const { checkCurrentUser } = require("../middlewares/checkCurrentUser");
const Router = express.Router();

Router.route("/login").post(login);
Router.route("/loginadmin").post(loginAdmin);
Router.route("/gettopaccount").get(getTopAccount);
Router.route("/searchaccount/:account").get(getSearchAccount);
Router.route("/recharge/:userid").put(reCharge);
Router.route("/deleteaccount/:userid").delete(deleteAccount);
Router.route("/updateaccount/:userid").put(updateAccount);
Router.route("/updateminuteaccount/:userid").put(updateMinuteAccount);
Router.route("/").get(checkCurrentUser, getCurrentUser);

module.exports = Router;
