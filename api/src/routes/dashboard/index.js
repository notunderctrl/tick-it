const express = require('express');

const router = express.Router();

router.use('/@me', require('./@me'));

module.exports = router;
