const express = require('express');
const MomoController = require('../controller/momo.controller');
const JWT = require('../middleware/auth');
const router = express.Router();

const controller = new MomoController();

router.post('/', controller.action('createMomoPayment'));
router.post('/ipn', controller.action('handleIPN'));

module.exports = router;
