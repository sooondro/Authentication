const express = require('express');

const router = express.Router();

//any route in here is pre-pended with /auth

router.get('/', (req, res) => {
  res.json({
    message: 'Router is working',
  });
});

module.exports = router;
