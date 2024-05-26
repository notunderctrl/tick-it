const express = require('express');

const router = express.Router();

// GET: api.tick-it.com/tickets/guild/19873489234

router.get('/guild/:id', (req, res) => {
  const { id: guildId } = req.params;

  res.send(`Getting tickets for guild id ${guildId}`);
});

router.post('/', (req, res) => {
  res.send('POST: tickets route');
});

module.exports = router;
