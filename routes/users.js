var express = require("express");
var router = express.Router();
const User = require("../models/user-model");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/all", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ message: "Error getting users" });
    console.log(err);
  }
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
  const foundUser = await User.findOne({ username });

  if (foundUser.password === password) {
    foundUser.isLoggedIn = true;
    await foundUser.save();
    res.status(200).json(foundUser);
  } else {
    res.status(401).json({ message: "Wrong password" });
  }
  console.log(foundUser);
});

router.post("/logout", async (req, res, next) => {
  const loggedInUser = req.body.username;
  const foundUser = await User.findOne({ username: loggedInUser });

  if (foundUser.isLoggedIn) {
    foundUser.isLoggedIn = false;
    await foundUser.save();
    res.status(200).json(foundUser);
  } else {
    res.status(401).json({ message: "User is not logged in" });
  }
  console.log(foundUser);
});

module.exports = router;
