const express = require('express');
const { hasPermissions } = require('../../../lib/utils');

const router = express.Router();

const DISCORD_ENDPOINT = 'https://discord.com/api/v10';
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

router.get('/', (req, res) => {
  if (req.user) {
    const { accessToken, refreshToken, ...user } = req.user;

    res.status(200).json(user);
  } else {
    res.status(401).json({ message: 'Not logged in' });
  }
});

router.get('/guilds', async (req, res) => {
  if (!req.user?.accessToken) {
    return res.status(401).json({ message: 'Not logged in' });
  }

  const guildsRes = await fetch(`${DISCORD_ENDPOINT}/users/@me/guilds`, {
    headers: {
      Authorization: `Bearer ${req.user.accessToken}`,
    },
  });

  if (!guildsRes.ok) {
    return res.status(500).json({ message: 'Failed to fetch guilds' });
  }

  const guilds = await guildsRes.json();

  const filteredGuilds = guilds.filter((guild) =>
    hasPermissions(guild.permissions, 'ManageGuild')
  );

  res.status(200).json(filteredGuilds);
});

module.exports = router;
