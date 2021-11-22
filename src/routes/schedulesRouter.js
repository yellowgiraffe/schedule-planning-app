const express = require('express');
const schedulesController = require('../controllers/schedulesController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router
  .route('/')
  .get(schedulesController.getAllSchedules)
  .post(schedulesController.checkSchedule, schedulesController.createSchedule);

router.route('/new').get(checkAuth, schedulesController.getForm);

router
  .route('/my')
  .get(checkAuth, schedulesController.getMySchedules)
  .post(schedulesController.deleteSchedule);

router
  .route('/my/:id')
  .get(checkAuth, schedulesController.editForm)
  .post(schedulesController.checkSchedule, schedulesController.updateSchedule);

module.exports = router;
