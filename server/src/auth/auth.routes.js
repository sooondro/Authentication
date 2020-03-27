const express = require('express');

const controller = require('./auth.controller');
const middlewares = require('./auth.middlewares');

const router = express.Router();

const defaultLoginError = 'Unable to login.';
const signUpError = 'Username already exists. Please choose another one.';

// any route in here is pre-pended with /auth
router.get(
  '/',
  controller.get,
);

router.post(
  '/signup',
  middlewares.validateUser(),
  middlewares.findUser(signUpError, (user) => user, 409),
  controller.signup,
);

router.post(
  '/login',
  middlewares.validateUser(defaultLoginError),
  middlewares.findUser(defaultLoginError, (user) => !(user && user.active)),
  controller.login,
);

module.exports = router;
