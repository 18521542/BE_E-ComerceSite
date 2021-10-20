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
      const accessToken = jwt.sign(
        { username: account.username },
        process.env.JWT_SECRET,
        {
          expiresIn: '24h',
        },
      );
      res.send({
        message: 'Login successfully. Hello,' + account.username,
        jwt_token: accessToken,
      });
    } else {
      res.send('Username or password is incorrect. Please try again!');
    }
    // next();
  }
}

module.exports = AccountController;
