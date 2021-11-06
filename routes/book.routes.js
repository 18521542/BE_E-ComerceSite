const express = require('express');
const BookController = require('../controller/book.controller');
const JWT = require('../middleware/auth');
const router = express.Router();

const controller = new BookController();

router.get('/', controller.action('list'));
router.post('/', controller.action('create'));
router.put('/:id', controller.action('update'));

module.exports = router;
