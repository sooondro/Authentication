const db = require('../db/connection');

const users = db.get('users');
users.createIndex({ username: 1 }, { unique: true });

module.exports = users;
