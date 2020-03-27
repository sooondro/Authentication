const db = require('../db/connection');

const users = db.get('users');

const list = async (req, res, next) => {
  try {
    const result = await users.find({}, '-password');
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  list,
};
