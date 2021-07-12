const express = require("express");
const Posts = require("../schemas/posts");
const router = express.Router();

router.get("/data", async (req, res, next) => {
  try {
    const {} = req.query;
    const posts = await Posts.find({}).sort("-createdAt");
    res.json({ posts: posts });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/', (req, res) => {
  res.render('board')
})

router.get('/view', (req, res) => {
  res.render('view')
})

router.get('/view/data', async (req, res) => {
  const {id} = req.query
  const data = await Posts.findOne({_id: id})
  res.json({data})
})

module.exports = router;