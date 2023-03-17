var express = require("express");
var router = express.Router();
const Post = require("../models/post-model");

/* GET posts listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/create", async (req, res, next) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ message: "Error creating post" });
    console.log(err);
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ message: "Error getting posts" });
    console.log(err);
  }
});

module.exports = router;
