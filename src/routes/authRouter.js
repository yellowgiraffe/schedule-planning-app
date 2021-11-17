const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/login')
  .get(authController.getLoginPage)
  .post(authController.login);

router
  .route('/logout')
  .post(authController.logout);

router
  .route('/signup')
  .get(authController.getSignupPage)
  .post(authController.validateNewUser, authController.createUser);

module.exports = router;
