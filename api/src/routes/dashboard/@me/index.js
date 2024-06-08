const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  if (req.user) {
    const { accessToken, refreshToken, ...user } = req.user;

    res.status(200).json(user);
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

module.exports = router;
