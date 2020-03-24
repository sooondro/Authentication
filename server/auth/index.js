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
              password: hash
            };
            users.insert(newUser).then((insertedUser) => {
              delete insertedUser.password; //Hash password not returned in res.json
              res.json(insertedUser);
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
    }).then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password).then((result) => {
          if (result) {
            const payload = {
              _id: user._id,
              username: user.username
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
