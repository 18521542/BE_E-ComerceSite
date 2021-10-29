const express = require('express');
const AuthorController = require('../controller/author.controller');
const JWT = require('../middleware/auth/index');
const router = express.Router();

const controller = new AuthorController();

router.get('/', controller.action('list'));
router.post('/', controller.action('create'));

module.exports = router;
