const express = require('express');
const User = require('../../models/User');

const router = express.Router();

// GET: api.tick-it.com/auth/signin
// GET: api.tick-it.com/auth/callback

router.get('/signin', (req, res) => {
  res.redirect(
    'https://discord.com/oauth2/authorize?client_id=1244372835997061170&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fauth%2Fcallback&scope=guilds+identify'
  );
});

router.get('/callback', async (req, res) => {
  const DISCORD_ENDPOINT = 'https://discord.com/api/v10';
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

  const { code } = req.query;

  if (!code) {
    return res.status(400).json({
      error: 'A "code" query parameter must be present in the URL.',
    });
  }

  const oauthRes = await fetch(`${DISCORD_ENDPOINT}/oauth2/token`, {
    method: 'POST',
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      redirect_uri: REDIRECT_URI,
      code,
    }).toString(),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (!oauthRes.ok) {
    console.log('error', oauthRes);
    res.send('error');
    return;
  }

  const oauthResJson = await oauthRes.json();

  const userRes = await fetch(`${DISCORD_ENDPOINT}/users/@me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${oauthResJson.access_token}`,
    },
  });

  if (!userRes.ok) {
    return res.send('error');
  }

  const userResJson = await userRes.json();

  const userExists = await User.exists({ id: userResJson.id });

  if (userExists) {
    // TODO: update database document and redirect to dashboard
    res.send('your profile already exists!');
    return;
  }

  const newUser = new User({
    id: userResJson.id,
    username: userResJson.username,
    avatarHash: userResJson.avatar,
    accessToken: oauthResJson.access_token,
    refreshToken: oauthResJson.refresh_token,
  });

  await newUser.save();
  res.send('success');
});

module.exports = router;
