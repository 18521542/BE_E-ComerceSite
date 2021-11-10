const uuidv4 = require('uuid');
const TransactionService = require('../services/transaction.service');
const CRUD = require('./index');

class TransactionController extends CRUD {
  /**
   * list - List all objects in the database
   *
   * @function list
   * @memberof  module:controllers/CRUD
   * @param  {Object} req  Express request object
   * @param  {Object} res  Express response object
   * @param  {Function} next Express next middleware function
   */
  async list(req, res) {
    const data = await TransactionService.getAllTransaction();
    return res.send(data);
  }

  /**
   * create - creates a new entity.
   *
   * @function create
   * @memberof module:controllers/CRUD
   * @param  {Object} req  Express request object
   * @param  {Object} res  Express response object
   * @param  {Function} next Express next middleware function
   */
  async create(req, res, next) {
    let currentDate = new Date();
    // console.log(res.locals.user);
    let transaction = {
      id: uuidv4(),
      username: res.locals.user.account,
      price_total: req.body.price_total,
      details: req.body.details,
      created_at: currentDate,
      updated_at: currentDate,
    };
    // console.log(transaction.details);
    let result = await TransactionService.createNewTransaction(transaction);
    res.send(result);
  }
}

module.exports = TransactionController;
