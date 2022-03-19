const express = require('express');
const TransactionController = require('../controller/transaction.controller');
const JWT = require('../middleware/auth');
const { route } = require('./author.routes');
const router = express.Router();

const controller = new TransactionController();

router.get(
  '/',
  JWT.verifyRoleAdmin(process.env.ACCESS_JWT_SECRET),
  controller.action('list'),
);
router.get(
  '/history',
  JWT.verifyJWT(process.env.ACCESS_JWT_SECRET),
  controller.action('listHistory'),
);
router.post(
  '/',
  JWT.verifyJWT(process.env.ACCESS_JWT_SECRET),
  controller.action('create'),
);
router.put(
  '/updatestatus/:id',
  JWT.verifyJWT(process.env.ACCESS_JWT_SECRET),
  controller.updateStatus,
);

module.exports = router;
