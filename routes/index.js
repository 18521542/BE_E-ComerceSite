const express = require('express');
const router = express.Router();
const test = require('./test.routes');
const account = require('./account.routes');

router.use('/test', test);
router.use('/account', account);

module.exports = router;
