const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routes/auth");
const path = require("path");
const flash = require("connect-flash");
const mainRouter = require("./routes/main");

const MONGODB_URI =
  "mongodb+srv://grut2077:I562530y2009@node-course-shop.8ylfs.mongodb.net/web-chat";
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

app.use(flash());
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use(authRouter);
app.use(mainRouter);

app.use((error, req, res, next) => {
  const errorMessage = error.message;
  const errorStatusCode = error.statusCode || 500;
  const data = error.data;
  return res.status(errorStatusCode).json({
    message: errorMessage,
    data: data,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Server listening");
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });
