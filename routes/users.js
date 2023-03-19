var express = require("express");
var router = express.Router();
const User = require("../models/user-model");
const CryptoJS = require("crypto-js");

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
    const username = req.body.username;
    const email = req.body.email;
    const password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SALT
    ).toString();

    const user = new User({ username, email, password });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res, next) => {
  const inputUsername = req.body.username;
  const inputPassword = req.body.password;

  const foundUser = await User.findOne({ username: inputUsername });

  const hashedPassword = CryptoJS.AES.decrypt(
    foundUser.password,
    process.env.SALT
  ).toString(CryptoJS.enc.Utf8);

  if (inputPassword === hashedPassword) {
    foundUser.isLoggedIn = true;
    await foundUser.save();
    res.status(200).json(foundUser);
  } else {
    res.status(401).json({ message: "Wrong password" });
  }
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
