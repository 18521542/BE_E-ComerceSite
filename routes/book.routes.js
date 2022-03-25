const express = require('express');
const BookController = require('../controller/book.controller');
const JWT = require('../middleware/auth');
const router = express.Router();

const controller = new BookController();

router.get('/:id', controller.action('retrieve'));
router.get('/', controller.action('list'));
router.post('/', controller.action('create'));
router.put('/:id', controller.action('update'));
// filter author and category
router.get('/filterAuthor/:id', controller.action('filterAuthorList'));
router.get('/filterCategory/:id', controller.action('filterCategoryList'));

module.exports = router;
