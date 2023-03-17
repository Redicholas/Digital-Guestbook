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
    console.log(err);
  }
});

module.exports = router;
