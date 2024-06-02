const express = require('express');
const setReqUser = require('./set-req-user');

const router = express.Router();

router.use(setReqUser);

module.exports = router;
