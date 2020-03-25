const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const controller = require('../controllers/users.controller');

const db = require('../db/connection');
const users = db.get('users');

const router = express.Router();

const schema = Joi.object().keys({
  username: Joi.string().regex(/(^[a-zA-Z0-9_]+$)/).min(2).max(30),
  password: Joi.string().trim().min(8),
  roles: Joi.string().valid('user', 'admin'),
  active: Joi.bool()
});

router.get('/', controller.list);

router.patch('/:id', async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    //validate req body
    const result = Joi.validate(req.body, schema);
    if (!result.error) {
      // if valid: find user in db with given id
      const query = { _id };
      const user = await users.findOne(query);
      if (user) {
        // update user in db
        const updatedUser = req.body;
        if (updatedUser.password) {
          updatedUser.password = await bcrypt.hash(updatedUser.password, 12);
        }
        const result = await users.findOneAndUpdate(query, {
          $set: updatedUser,
        });
        delete result.password;
        res.json(result);
      } else {
        //if not exists - send 404 error
        next();
      }
    } else {
      // if not valid - send and error with the reason
      res.status(422);
      throw new Error(result.error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
