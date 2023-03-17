var express = require("express");
var router = express.Router();
const User = require("../models/user-model");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user.password === password) {
    user.isLoggedIn = true;
    await user.save();
    res.status(200).json(user);
    console.log(user);
  } else {
    res.status(401).json({ message: "Wrong password" });
  }
});

module.exports = router;
