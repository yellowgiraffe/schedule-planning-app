const express = require('express');
const usersHandler = require('../handlers/usersHandler');

const router = express.Router();

router.param('id', usersHandler.checkID);

router.route('/').get(usersHandler.getAllUsers);

router.route('/:id').get(usersHandler.getUser);

router.route('/:id/schedule').get(usersHandler.getScheduleByUser);

module.exports = router;