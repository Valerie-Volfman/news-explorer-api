const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const ErrorHandler = require('./middlewares/error-handler');


const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(errors());
app.use(requestLogger);

app.use(limiter);

app.use('/', router);

app.use(errorLogger);
app.use((err, req, res, next) => {
  ErrorHandler(err, res);
});

app.listen(PORT);
