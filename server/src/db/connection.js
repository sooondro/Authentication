const monk = require('monk');

require('dotenv').config();

let dbURL = process.env.DB_URL;

if (process.env.NODE_ENV === 'test') {
  dbURL = process.env.DB_URL;
}

const db = monk(dbURL);

module.exports = db;
