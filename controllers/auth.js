const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getLogin = (req, res, next) => {
  res.render("auth/login-page", {
    pageTitle: "Login",
    errors: null,
  });
};

exports.getRegister = (req, res, next) => {
  res.render("auth/register-page", {
    pageTitle: "Register",
    errors: null,
  });
};

exports.postSignup = async (req, res, next) => {
  const errors = validationResult(req);

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Enter valid data");
      error.statusCode = 401;
      error.data = error.toArray();
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      name: name,
    });
    const result = await user.save();
    return res.json({
      message: "Sign up successfully",
      userId: result._id,
    });
  } catch (err) {
    next(err);
  }
};
exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Enter valid data");
      error.statusCode = 401;
      error.data = error.toArray();
      throw error;
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("No such user");
      error.statusCode = 404;
      error.data = null;
      throw error;
    }
    const isEqualPasswords = await bcrypt.compare(password, user.password);
    if (!isEqualPasswords) {
      const error = new Error("E-Mail or password is invalid");
      error.statusCode = 404;
      error.data = null;
      throw error;
    }
    const token = jwt.sign(
      {
        email: email,
      },
      "somesupersecretsecret"
    );
    loadedUser = user._doc;
    return res.json({
      message: "Logged in",
      token: token,
      userId: loadedUser._id.toString(),
    });
  } catch (err) {
    next(err);
  }
};
