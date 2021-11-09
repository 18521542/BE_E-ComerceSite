const express = require('express');
const ShopController = require('../controller/shop.controller');
const JWT = require('../middleware/auth');
const router = express.Router();

const controller = new ShopController();

router.get('/', controller.action('list'));
router.post(
  '/',
  JWT.verifyJWT(process.env.ACCESS_JWT_SECRET),
  controller.action('create'),
);

module.exports = router;
