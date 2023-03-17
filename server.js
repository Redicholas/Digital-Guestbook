const express = require("express");
const app = express();
const usersRoute = require("./routes/users.js");
const postsRoute = require("./routes/posts.js");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use("/users", usersRoute);
app.use("/posts", postsRoute);

async function init() {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.DB_URI, options);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

init();
