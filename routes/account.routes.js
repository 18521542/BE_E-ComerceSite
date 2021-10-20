const express = require('express');
const TestController = require('../controller/account.controller');
const router = express.Router();

const controller = new TestController();

router.post('/create', controller.action('create'));
router.get('/login', controller.action('retrive'));

module.exports = router;
