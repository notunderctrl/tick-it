const express = require('express');
const authRoutesHandler = require('./auth');
const ticketRoutesHandler = require('./tickets');

const router = express.Router();

router.use('/auth', authRoutesHandler);
router.use('/tickets', ticketRoutesHandler);

module.exports = router;
