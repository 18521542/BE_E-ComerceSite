const express = require('express');
const router = express.Router();
const account = require('./account.routes');
const author = require('./author.routes');
const category = require('./category.routes');
const book = require('./book.routes');

router.use('/account', account);

// Api author, category
router.use('/api/author', author);
router.use('/api/category', category);

// Api book (include book_author, book_category)
router.use('/api/book', book);

module.exports = router;
