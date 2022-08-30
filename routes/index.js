const express = require('express');
const userRouter = require('./users');
const articleRouter = require('./articles');
const { createUser, login } = require('../controllers/user');
const auth = require('../middlewares/auth');
const CentralError = require('../errors/central-error');

const router = express.Router();
router.post('/signin', login);

router.post('/signup', createUser);

router.use(auth);

router.use(userRouter);
router.use(articleRouter);
router.get('*', () => {
  throw new CentralError(404, 'Requested resource not found');
});

module.exports = router;
