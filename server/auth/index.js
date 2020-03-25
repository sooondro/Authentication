const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const db = require('../db/connection');
const users = db.get('users')
users.createIndex({ username: 1 }, { unique: true });

const router = express.Router();

const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30).required(),
  password: Joi.string().trim().min(8).required(),
});

function createTokenSendResponse(user, res, next) {
  const payload = {
    _id: user._id,
    username: user.username,
    role: user.role,
    active: user.active
  };
  jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: '1d'
  }, (err, token) => {
    if (err) {
      respondError422(res, next);
    } else {
      res.json({ token });
    }
  });
}

//any route in here is pre-pended with /auth
router.get('/', (req, res) => {
  res.json({
    message: 'Router is working',
  });
});

//POST route on /auth/signup
router.post('/signup', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    users.findOne({
      username: req.body.username
    }).then((user) => {
      if (user) {
        const error = new Error('Username already exists. Please choose another one.');
        res.status(409);
        next(error);
      } else {
        bcrypt.hash(req.body.password.trim(), 12,(err, hash) => {
          if (err) {
            next(err);
          } else {
            const newUser = {
              username: req.body.username,
              password: hash,
              role: 'user',
              active: true
            };
            users.insert(newUser).then((insertedUser) => {
              createTokenSendResponse(insertedUser, res, next);
            });
          }
        });
      }
    });
  } else {
    res.status(422);
    next(result.error);
  }
});

function respondError422(res, next){
  res.status(422);
  const error = new Error('Unable to login.');
  next(error);
}

router.post('/login', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error === null) {
    users.findOne({
      username: req.body.username,
      // active: true if not wanter to use that condition in if
    }).then((user) => {
      if (user && user.active) {
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (result) {

            createTokenSendResponse(user, res, next);
          } else {
            respondError422(res, next);
          }
        });
      } else {
        respondError422(res, next);
      }
    });
  } else {
    respondError422(res, next);
  }
});

module.exports = router;
