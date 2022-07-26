const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const userRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const { createUser, login } = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const ErrorHandler = require('./middlewares/error-handler');
const CentralError = require('./errors/central-error');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/aroundb');
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(errors());
app.use(requestLogger);

app.use(limiter);

app.post('/signin', login);

app.post('/signup', createUser);

app.use(auth);

app.use(userRouter);
app.use(articleRouter);
app.get('*', () => {
  throw new CentralError(404, 'Requested resource not found');
});

app.use(errorLogger);
app.use((err, req, res, next) => {
  ErrorHandler(err, res);
});

app.listen(PORT);
