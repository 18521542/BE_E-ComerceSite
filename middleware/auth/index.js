const jwt = require('jsonwebtoken');
const cryptojs = require('crypto-js');
const AuthenticationError = require('../../errors/BusinessError/index');
//this file contain code to authorize user
function verifyJWT(jwtSecret) {
  return (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    jwt.verify(accessToken, jwtSecret, (err, decoded) => {
      if (err) {
        throw new AuthenticationError(err);
        // res.sendStatus(401).json({ status: "Error" });
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

function renewAccessJWT() {
  return (req, res, next) => {
    const  refreshToken = req.cookies.refreshToken;
    if (refreshToken)
      jwt.verify(
        refreshToken,
        process.env.REFRESH_JWT_SECRET,
        (err, decoded) => {
          if (err) throw new AuthenticationError(err);
          else {
            const newAccessToken = jwt.sign(
              { username: decoded.username },
              process.env.ACCESS_JWT_SECRET,
              {
                expiresIn: '30s',
              },
            );

            res.cookie('accessToken', newAccessToken, {
              maxAge: 30000, //30 seconds,
              httpOnly: true,
            });
          }
        },
      );
    else {
      return res.sendStatus(401);
    }
    next();
  };
}

// function signJWT(payload, expired) {
//   return jwt.sign({ payload }, process.env.ACCESS_JWT_SECRET, {
//     expiresIn: '30s',
//   });
// }

module.exports = { verifyJWT, renewAccessJWT };
