const express = require('express');
const usersController = require('../controllers/usersController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.param('id', usersController.checkID);

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.validateNewUser, usersController.createUser);

router.route('/new').get(checkAuth, usersController.getForm);

router.route('/:id').get(usersController.getUser);

router.route('/:id/schedule').get(usersController.getScheduleByUser);

module.exports = router;
