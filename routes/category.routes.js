const express = require('express');
const CategoryController = require('../controller/category.controller');
const JWT = require('../middleware/auth');
const router = express.Router();

const controller = new CategoryController();

router.get('/', controller.action('list'));
router.post('/', controller.action('create'));

// get author by id
router.get('/:id', controller.action('retrieve'));

module.exports = router;
