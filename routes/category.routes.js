const express = require('express');
const CategoryController = require('../controller/category.controller');
const JWT = require('../middleware/auth');
const router = express.Router();

const controller = new CategoryController();

router.get('/', controller.action('list'));
router.post('/', controller.action('create'));

module.exports = router;
