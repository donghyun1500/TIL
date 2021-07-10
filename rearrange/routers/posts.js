const express = require("express");
const Posts = require("../schemas/Posts");

const router = express.Router();

router.get("/posts", async (req, res, next) => {
  try {
    const { title } = req.query;
    const posts = await Posts.find({ title }).sort("-postsId");
    res.json({ posts: posts });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/posts/:postsId", async (req, res) => {
  const { postsId } = req.params;
  posts = await Goods.findOne({ postsId: postsId });
  res.json({ detail: posts });
});

module.exports = router;