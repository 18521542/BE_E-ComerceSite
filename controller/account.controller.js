const AccountService = require('../services/account.service');
const CRUD = require('./index');
const jwt = require('jsonwebtoken');

class AccountController extends CRUD {
  /**
   * create - creates a new entity.
   *
   * @function create
   * @memberof module:controllers/CRUD
   * @param  {Object} req  Express request object
   * @param  {Object} res  Express response object
   * @param  {Function} next Express next middleware function
   */
  async create(req, res) {
    let currentDate = new Date();
    let account = {
      username: req.body.username,
      password: req.body.password,
      photo: req.body.photo,
      name: req.body.name,
      telephone: req.body.telephone,
      address: req.body.address,
      email: req.body.email,
      created_at: currentDate,
      updated_at: currentDate,
    };
    let result = await AccountService.createnewAccount(account);
    res.send(result);
  }

  /**
   * retrive - retrive an account from db.
   *
   * @function create
   * @memberof module:controllers/CRUD
   * @param  {Object} req  Express request object
   * @param  {Object} res  Express response object
   * @param  {Function} next Express next middleware function
   */
  async retrive(req, res, next) {
    let account = {
      username: req.body.username,
      password: req.body.password,
    };
    let result = await AccountService.checkAccount(account);
    // res.send(result);
    if (result) {
      // Sign jwt token when login successfully
      const access_jwt_token = jwt.sign(
        { username: account.username },
        process.env.ACCESS_JWT_SECRET,
        {
          expiresIn: '30s',
        },
      );

      const refresh_jwt_token = jwt.sign(
        { username: account.username },
        process.env.REFRESH_JWT_SECRET,
        {
          expiresIn: '1y',
        },
      );

      // Set cookies for JWT
      res.cookie('access_jwt_token', access_jwt_token, {
        maxAge: 300000, //5 minutes,
        httpOnly: true,
      });

      res.cookie('refresh_jwt_token', refresh_jwt_token, {
        maxAge: 3.154e10,
        httpOnly: true,
      });

      res.send({
        message: 'Login successfully. Hello,' + account.username,
        access_jwt_token: access_jwt_token,
        refresh_jwt_token: refresh_jwt_token,
      });
    } else {
      res.send('Username or password is incorrect. Please try again!');
    }
    // next();
  }

  /**
   * logout - logout an account, delete the access and refresh Token.
   *
   * @function logout
   * @param  {Object} req  Express request object
   * @param  {Object} res  Express response object
   * @param  {Function} next Express next middleware function
   */
  async logOut(req, res) {
    res.cookie('accessToken', '', { maxAge: 0 });
    res.cookie('refreshToken', '', { maxAge: 0 });
    res.redirect('/');
  }
}

module.exports = AccountController;
