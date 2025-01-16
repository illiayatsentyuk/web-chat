const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/auth");

const MONGODB_URI = "mongodb://127.0.0.1:27017/web-chat";
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(authRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Server listening");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
