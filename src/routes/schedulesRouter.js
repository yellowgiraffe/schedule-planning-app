const express = require('express');
const schedulesHandler = require('../handlers/schedulesHandler');

const router = express.Router();

router
  .route('/')
  .get(schedulesHandler.getAllSchedules)
  .post(schedulesHandler.createSchedule);

module.exports = router;
