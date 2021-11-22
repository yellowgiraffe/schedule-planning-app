const express = require('express');
const usersController = require('../controllers/usersController');
const checkAuth = require('../middleware/checkAuth');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(usersController.getAllUsers);

router
  .route('/my/profile')
  .get(checkAuth, usersController.getMyProfile)
  .post(usersController.updateMyProfile);

router
  .route('/my/profile/delete')
  .post(usersController.deleteMyAccount, authController.logout);

router.route('/:id').get(usersController.getUser);

router.route('/:id/schedule').get(usersController.getScheduleByUser);

module.exports = router;
