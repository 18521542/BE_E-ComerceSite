const express = require('express');
const router = express.Router();
const account = require('./account.routes');
const author = require('./author.routes');
const category = require('./category.routes');
const book = require('./book.routes');
const shop = require('./shop.routes');
const transaction = require('./transaction.routes');

router.use('/api/account', account);
router.use('/api/author', author);
router.use('/api/category', category);
router.use('/api/book', book);
router.use('/api/shop', shop);
router.use('/api/transaction', transaction);

module.exports = router;
