const express = require('express');
const router = express.Router();
const account = require('./account.routes');
const author = require('./author.routes');
const category = require('./category.routes');
const book = require('./book.routes');
const shop = require('./shop.routes');
const transaction = require('./transaction.routes');

router.use('/api/account', account);

// Api author, category
router.use('/api/author', author);
router.use('/api/category', category);

// Api book (include book_author, book_category)
router.use('/api/book', book);

// Shop, payment, shipper, coupon api
router.use('/api/shop', shop);

// Transaction
router.use('/api/transaction', transaction);

module.exports = router;
