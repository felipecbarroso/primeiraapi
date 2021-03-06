require('dotenv').config();
const cors = require('cors');
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const routes = require('./routes');
const logger = require('./helper/logger');

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(
  '/images',
  express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
);
app.use(express.json());
app.use(morgan('dev'));
app.use(routes);

app.use((error, req, res, next) => {
  logger.error();
  error;
  res.status(500).json({ erro: 'Houve um erro na API' });
});

app.listen(process.env.PORT || 3000, () =>
  logger.info(`API FUNCIONANDO NA PORTA ${process.env.PORT || 3000}`)
);
