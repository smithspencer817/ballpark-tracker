const express = require('express');
const router = express.Router();
const ballparkRoute = require('./ballparks');
const userRoute = require('./users');
const visitRoute = require('./visits');

router.use('/ballparks', ballparkRoute);
router.use('/users', userRoute);
router.use('/visits', visitRoute);

module.exports = router;