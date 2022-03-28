const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
exports.getAllPosts = async (req, res, next) => {
  const { page } = req.params;
  const limit = 5;
  const skip = (page - 1) * limit;
  const { userId } = req.user;
  try {
    const posts = await Post.find({ author: { _id: userId } })
      .populate("author", "name _id")
      .select("content createdAt updatedAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const number = await Post.countDocuments({
      author: { _id: userId },
    });
    const numberPage = Math.ceil(number / limit);

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: { posts, numberPage },
    });
  } catch (error) {
    res.json(error);
  }
};

exports.createOnePost = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const post = await Post.create({ ...req.body, author: userId });

    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (error) {
    // res.json(error);
    next(error);
  }
};
exports.updateOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndUpdate(
      postId,
      { ...req.body },
      { new: true, runValidator: true }
    );

    res.status(200).json({
      status: "success",
      data: { post },
    });
  } catch (error) {
    // res.json(error);
    next(error);
  }
};

exports.deleteOnePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    await Post.findByIdAndDelete(postId);

    res.status(200).json({
      status: "success",
      message: "Post has been deleted",
    });
  } catch (error) {
    next(error);
  }
};
