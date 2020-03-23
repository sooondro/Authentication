const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

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
    next(result.error);
  }
});


module.exports = router;
