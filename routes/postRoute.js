const express = require("express");
const {
  getAllPosts,
  createOnePost,
  updateOnePost,
  deleteOnePost,
} = require("../controllers/postController.js");

const { verifyToken } = require("../middlewares/verifyToken.js");
const { checkCurrentUser } = require("../middlewares/checkCurrentUser");
const { getCurrentUser } = require("../controllers/authController.js");

const Router = express.Router();

Router.route("/:page").get(verifyToken, getAllPosts);
Router.route("/:postId")
  .put(verifyToken, updateOnePost)
  .delete(verifyToken, deleteOnePost);
Router.route("/").post(verifyToken, createOnePost);
module.exports = Router;
