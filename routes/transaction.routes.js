const express = require('express');
const TransactionController = require('../controller/transaction.controller');
const JWT = require('../middleware/auth');
const router = express.Router();

const controller = new TransactionController();

router.get('/', controller.action('list'));
router.post(
  '/',
  JWT.verifyJWT(process.env.ACCESS_JWT_SECRET),
  controller.action('create'),
);

module.exports = router;
