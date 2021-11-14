const express = require('express');
const schedulesHandler = require('../controllers/schedulesController');

const router = express.Router();

router
  .route('/')
  .get(schedulesHandler.getAllSchedules)
  .post(schedulesHandler.createSchedule);

router.route('/new').get(schedulesHandler.getForm);

module.exports = router;
