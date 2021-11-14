const express = require('express');
const schedulesController = require('../controllers/schedulesController');

const router = express.Router();

router
  .route('/')
  .get(schedulesController.getAllSchedules)
  .post(schedulesController.createSchedule);

router.route('/new').get(schedulesController.getForm);

module.exports = router;
