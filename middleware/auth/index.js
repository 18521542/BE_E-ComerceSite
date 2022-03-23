const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
const AuthenticationError = require('../../errors/BusinessError');
//this file contain code to authorize user
function verifyJWT(jwtSecret) {
  return (req, res, next) => {
    const accessToken =
      req.cookies.access_jwt_token ||
      req.headers['api_key'] ||
      req.headers['Authorization'];
    jwt.verify(accessToken, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: JSON.stringify(err),
          status: 'Error authorization',
        });
        return;
      }
      if (decoded) {
        // get the account data to know who is authorized
        const accountData = {
          account: decoded.username,
        };
        if (!accountData) {
          throw new AuthenticationError('Invalid Data for authorization');
        }
        res.locals.user = accountData; //eslint-disable-line
      }
      next();
    });
  };
}

function verifyRoleAdmin(jwtSecret) {
  return (req, res, next) => {
    const accessToken =
      req.cookies.access_jwt_token ||
      req.headers['api_key'] ||
      req.headers['Authorization'];
    jwt.verify(accessToken, jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).send({
          message: JSON.stringify(err),
          status: 'Error authorization',
        });
        return;
      }
      if (decoded) {
        // get the account data to know who is authorized
        const typeRole = decoded.type;

        if (!typeRole) {
          throw new AuthenticationError(
            'You do not have permission to access this resource',
          );
        }
      }
      next();
    });
  };
}

function renewAccessJWT() {
  return (req, res, next) => {
    const refreshToken = req.cookies.refresh_jwt_token;
    if (refreshToken)
      jwt.verify(
        refreshToken,
        process.env.REFRESH_JWT_SECRET,
        (err, decoded) => {
          if (err) throw new AuthenticationError(err);
          else {
            const newAccessToken = jwt.sign(
              {
                username: decoded.username,
                type: decoded.type,
              },
              process.env.ACCESS_JWT_SECRET,
              {
                expiresIn: '30s',
              },
            );

            res.cookie('access_jwt_token', newAccessToken, {
              maxAge: 30000, //30 seconds,
              httpOnly: true,
            });
          }
        },
      );
    else {
      return res.status(401).send({ message: 'un-authorized' });
    }
    next();
  };
}

module.exports = { verifyJWT, renewAccessJWT, verifyRoleAdmin };
