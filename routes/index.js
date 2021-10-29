const express = require('express');
const router = express.Router();
const account = require('./account.routes');
const author = require('./author.routes');
const category = require('./category.routes');

router.use('/account', account);

// Api author, category
router.use('/api/author', author);
router.use('/api/category', category);

module.exports = router;
