const express = require("express");
const { register } = require("../controllers/adminController");
const Router = express.Router();

Router.route("/register").post(register);

module.exports = Router;
