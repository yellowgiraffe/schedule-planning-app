const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

module.exports = router;
