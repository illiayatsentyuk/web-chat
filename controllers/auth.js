const User = require('../models/user');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

exports.postSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(req);
    return res.json({
      message: 'Enter valid data',
      errors: errors,
    });
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      name: name,
    });
    await user.save();
    return res.json({
      message: 'Sign up successfully',
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: 'Some error while signing up',
    });
  }
};
exports.postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({
      message: 'Enter valid data',
      errors: errors,
    });
  }
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        message: 'No such user',
      });
    }
    const isEqualPasswords = await bcrypt.compare(password, user.password);
    if (!isEqualPasswords) {
      return res.json({
        message: 'Passwords do not match',
      });
    }
    return res.json({
      message: 'Logged in',
      user: user,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: 'Some error while logining in',
    });
  }
};
