const express = require('express');
const volleyball = require('volleyball');

const app = express();

//Any time a req is made with /auth, it goes to router to see if any paths match
//const auth = require('./auth/index.js');
//const auth = require('./auth/index');
const auth = require('./auth'); //Wil auto-find index if not specified

app.use(volleyball);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!',
  });
});

app.use('/auth', auth);

function notFound(req, res, next) {
  res.status(404);
  const error = new Error('Not Found - ' + req.originalURL);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening to port', port);
});
