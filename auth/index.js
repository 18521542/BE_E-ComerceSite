const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
const AuthenticationError = require('../errors/BusinessError/index');
//this file contain code to authorize user

function verifyJWT(jwtSecret) {
  return (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers['authorization'];
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        throw new AuthenticationError(err);
      }
      const accountData = {
        account: decoded.username,
      };
      if (!accountData) {
        throw new AuthenticationError('Invalid Data for authorization');
      }
      res.locals.user = accountData; //eslint-disable-line
      next();
    });
  };
}

module.exports = verifyJWT;
