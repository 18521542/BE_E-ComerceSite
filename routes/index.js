const express = require('express');
const router = express.Router();
const test = require('./test.routes');
const account = require('./account.routes');
const author = require('./author.routes');

router.use('/test', test);
router.use('/account', account);

// Api author
router.use('/api/author', author);

module.exports = router;
