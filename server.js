require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const routes = require('./api/routes/router');

(async () => {
  const PORT = process.env.PORT ?? 3000;
  const { ENVIRONMENT, DATABASE_URI } = process.env;
  if (!DATABASE_URI)
    return console.error('Invalid .env configuration');
  // Setting up MongoDB
  mongoose.set('debug', (ENVIRONMENT === 'dev'));
  await mongoose.connect(DATABASE_URI);
  console.info('Database successfully connected.');
  // Setting up Express
  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/api', routes);
  app.use(express.static(`${__dirname}/dist/griffith-keep`, { extensions: ['html'] }));
  app.listen(PORT, () => { console.info(`Server running on port: ${PORT}`); });
})();