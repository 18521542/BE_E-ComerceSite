const express = require('express');
const TestController = require('../controller/account.controller');
const JWT = require('../middleware/auth/index');
const router = express.Router();

const controller = new TestController();

router.post('/create', controller.action('create'));
router.get('/login', controller.action('retrive'));
router.get('/logout', controller.logOut);

// jwt refresh
router.get('/refresh-token', JWT.renewAccessJWT(), (req, res) => {
    res.sendStatus(200).json({ status: "successfully created" });
});

module.exports = router;
