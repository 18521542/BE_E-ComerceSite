const express = require('express');
const TestController = require('../controller/account.controller');
const JWT = require('../middleware/auth/index');
const router = express.Router();

const controller = new TestController();

router.post('/create', controller.action('create'));
router.post('/login', controller.action('retrive'));
router.get('/logout', controller.logOut);

// jwt refresh
router.get('/refresh-token', JWT.renewAccessJWT(), (req, res) => {
  res.status(200).json({ status: 'successfully created' });
});

// update info account
router.put(
  '/update',
  JWT.verifyJWT(process.env.ACCESS_JWT_SECRET),
  controller.action('update'),
);

// change password
router.put(
  '/changepassword',
  JWT.verifyJWT(process.env.ACCESS_JWT_SECRET),
  controller.changePassword,
);

// get all account for handling
// => only the account granted admin permission access to this api
router.get(
  '/getAll',
  JWT.verifyRoleAdmin(process.env.ACCESS_JWT_SECRET),
  controller.getAll,
);

// set role (just admin have this permission)
router.put(
  '/setRole/:username',
  JWT.verifyRoleAdmin(process.env.ACCESS_JWT_SECRET),
  controller.setRole,
);

module.exports = router;
