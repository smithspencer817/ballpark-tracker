const express = require('express');
const router = express.Router();
const ballparkRoute = require('./ballparks');
const userRoute = require('./users');
const visitRoute = require('./visits');
const teamRoute = require('./teams');

router.use('/ballparks', ballparkRoute);
router.use('/users', userRoute);
router.use('/visits', visitRoute);
router.use('/teams', teamRoute);

module.exports = router;