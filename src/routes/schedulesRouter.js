const express = require('express');
const schedulesHandler = require('../handlers/schedulesHandler');

const router = express.Router();

router.get('/', schedulesHandler.getAllUsers);

module.exports = router;
