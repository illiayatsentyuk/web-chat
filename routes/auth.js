const express = require('express');
const authController = require('../controllers/auth');
const { body } = require('express-validator');

const router = express.Router();

router.post(
  '/signup',
  [
    body('email', 'Enter valid email').trim().isEmail().normalizeEmail(),
    body('password', 'Enter valid password')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postSignup
);
router.post(
  '/login',
  [
    body('email', 'Enter valid email').isEmail().normalizeEmail(),
    body('password', 'Enter valid password')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

module.exports = router;
