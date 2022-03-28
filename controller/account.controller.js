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

    if (result) {
      // Sign jwt token when login successfully
      const dataAccount = await AccountService.findAccount(account.username);
      const access_jwt_token = jwt.sign(
        {
          username: account.username,
          type: dataAccount.type,
        },
        process.env.ACCESS_JWT_SECRET || 'duytrongdt',
        {
          expiresIn: '1h',
        },
      );

      const refresh_jwt_token = jwt.sign(
        {
          username: account.username,
          type: account.type,
        },
        process.env.REFRESH_JWT_SECRET || 'kimyenzt',
        {
          expiresIn: '1y',
        },
      );

      // Set cookies for JWT
      res.cookie('access_jwt_token', access_jwt_token, {
        // maxAge: 300000, //5 minutes,
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
      const message = {
        message: 'Username or password is incorrect. Please try again!',
      };
      res.send(message);
    }
  }

  async update(req, res, next) {
    let account = {
      username: res.locals.user.account,
      photo: req.body.photo,
      name: req.body.name,
      telephone: req.body.telephone,
      email: req.body.email,
      address: req.body.address,
    };
    let result = await AccountService.updateAccount(account);
    res.send(result);
  }

  // get user info
  async getInfo(req, res, next) {
    let username = res.locals.user.account;
    const data = await AccountService.getInfo(username);
    return res.send(data);
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
    res.send({ message: 'Logout Successfully' });
  }
  async changePassword(req, res, next) {
    let account = {
      username: res.locals.user.account,
      password: req.body.password,
      newPassword: req.body.newPassword,
    };
    let result = await AccountService.checkAccount(account);
    if (result) {
      let mess = await AccountService.changePassword(account);
      res.send(mess);
    } else {
      const message = {
        message: 'Old password is incorrect. Please try again!',
      };
      res.send(message);
    }
  }

  // get all account which displayed in database
  async getAll(req, res, next) {
    const data = await AccountService.getAllAccount();
    return res.send(data);
  }

  async setRole(req, res, next) {
    let account = {
      username: req.params.username,
      type: req.body.type,
    };
    let result = await AccountService.updateRole(account);
    res.send(result);
  }

  async authenticateGoogle(req, res, next) {
    let token = req.body.token;

    let result = await AccountService.authenticateGoogle(token);
    res.send(result);
  }

  async getAccount(req, res, next) {
    let username = req.params.username;
    let result = await AccountService.findAccount(username);
    res.send(result);
  }

  async getUsersTotal(req, res) {
    let data = await AccountService.getUsersTotal();
    res.send(data);
  }
}

module.exports = AccountController;
