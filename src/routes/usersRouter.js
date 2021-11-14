const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.param('id', usersController.checkID);

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(usersController.checkBody, usersController.createUser);

router.route('/new').get(usersController.getForm);

router.route('/:id').get(usersController.getUser);

router.route('/:id/schedule').get(usersController.getScheduleByUser);

module.exports = router;
