const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');

const app = express();

app.get('/', (req, res) => {
  res.json({
    success: 'Received request successfully!',
  });
});

const PORT = 3001;

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI required in .env');
}

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
