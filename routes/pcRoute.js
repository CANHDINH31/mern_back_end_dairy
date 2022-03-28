const express = require("express");
const {
  activePc,
  getAllPc,
  signOutPc,
  openPc,
  clockPc,
} = require("../controllers/pcController.js");

const { verifyToken } = require("../middlewares/verifyToken.js");
const { checkCurrentUser } = require("../middlewares/checkCurrentUser");
const { getCurrentUser } = require("../controllers/authController.js");

const Router = express.Router();
Router.route("/openpc").post(openPc);
Router.route("/clockpc").post(clockPc);
Router.route("/signout").post(signOutPc);
Router.route("/getAllPc").get(getAllPc);
Router.route("/").post(verifyToken, activePc);
module.exports = Router;
