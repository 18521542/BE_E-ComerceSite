const express = require('express');
const router = express.Router();
const account = require('./account.routes');
const author = require('./author.routes');
const category = require('./category.routes');
const book = require('./book.routes');
const shop = require('./shop.routes');
const transaction = require('./transaction.routes');

router.use('/account', account);
router.use('/author', author);
router.use('/category', category);
router.use('/book', book);
router.use('/shop', shop);
router.use('/transaction', transaction);

module.exports = router;
