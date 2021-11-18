const express = require('express');
const schedulesController = require('../controllers/schedulesController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router
  .route('/')
  .get(schedulesController.getAllSchedules)
  .post(schedulesController.checkConflicts, schedulesController.createSchedule);

router.route('/new').get(checkAuth, schedulesController.getForm);

module.exports = router;
