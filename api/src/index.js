const express = require('express');
const mongoose = require('mongoose');
const baseRouter = require('./routes/base-router');
require('dotenv/config');

const app = express();

app.use('/', baseRouter);

const PORT = 3001;

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI required in .env');
}

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to database.');

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
