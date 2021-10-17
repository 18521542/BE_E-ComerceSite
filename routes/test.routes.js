const express = require('express');
const TestController = require('../controller/test.controller');
const router = express.Router();

const controller = new TestController();

router.get('/', controller.action('list'));
router.get('/:id', controller.action('retrieve'));
router.post('/create', controller.action('create'));
router.put('/update/:id', controller.action('update'));

module.exports = router;
