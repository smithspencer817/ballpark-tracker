const express = require('express');
const router = express.Router();
const ballparkRoute = require('./ballparks');
const userRoute = require('./users');

router.use('/ballparks', ballparkRoute);
router.use('/users', userRoute);

module.exports = router;