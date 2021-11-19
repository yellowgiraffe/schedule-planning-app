const express = require('express');
const schedulesController = require('../controllers/schedulesController');
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router
  .route('/')
  .get(schedulesController.getAllSchedules)
  .post(schedulesController.checkConflicts, schedulesController.createSchedule);

router.route('/new').get(checkAuth, schedulesController.getForm);

router
  .route('/my')
  .get(checkAuth, schedulesController.getMySchedules)
  .post(schedulesController.foo, schedulesController.deleteSchedule);

router
  .route('/my/:id')
  .get(checkAuth, schedulesController.editForm)
  .post(schedulesController.updateSchedule);

module.exports = router;
