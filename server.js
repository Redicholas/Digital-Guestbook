const express = require("express");
const app = express();
const port = 3000;
const usersRoute = require("./routes/users.js");
const postsRoute = require("./routes/posts.js");
const mongoose = require("mongoose");

app.use(express.json());

app.use("/users", usersRoute);
app.use("/posts", postsRoute);

async function init() {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect("mongodb://localhost:27017/twitteralmost", options);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

init();
