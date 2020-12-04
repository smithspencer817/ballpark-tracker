const express = require('express');
const router = express.Router();
const ballparkRoute = require('./ballparks');

router.use('/ballparks', ballparkRoute);

module.exports = router;