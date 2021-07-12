const express = require("express");
const Posts = require("../schemas/posts");
const router = express.Router();


router.post("/", (req, res) => {
  let posts = new Posts()
  posts.title = req.body.title
  posts.author = req.body.author
  posts.comment = req.body.comment
  
  posts.save(function (err, result) {
    if (err) {
      console.error(err)
      res.json({ result: '에러 발생' })
      return
    }
  res.send({ result: 'success'});
  })
})

module.exports = router;