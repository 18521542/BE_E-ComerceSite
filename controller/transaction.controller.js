const uuidv4 = require('uuid').v4;
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
    return res.send({ message: data });
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
    res.send({ message: result });
  }

  // transaction for user
  async listHistory(req, res) {
    let username = res.locals.user.account;
    const data = await TransactionService.getTransaction(username);
    return res.send(data);
  }

  // update status for transaction
  async updateStatus(req, res) {
    let transactionId = req.params.id;
    let status = req.body.status;
    const data = await TransactionService.updateStatus(transactionId, status);
    return res.send(data);
  }

  async getTopUser(req, res) {
    const data = await TransactionService.getTopUser();
    return res.send(data);
  }

  async getOrdersTotal(req, res) {
    const data = await TransactionService.getOrdersTotal();
    return res.send(data);
  }

  async getRevenueTotal(req, res) {
    const data = await TransactionService.getRevenueTotal();
    return res.send(data);
  }

  async getLatestOrders(req, res) {
    const data = await TransactionService.getLatestOrders();
    return res.send(data);
  }

  async createMomo(req, res, next) {
    let currentDate = new Date();
    // console.log(res.locals.user);
    let transaction = {
      id: req.body.id,
      // status: -1,
      username: res.locals.user.account,
      price_total: req.body.price_total,
      details: req.body.details,
      created_at: currentDate,
      updated_at: currentDate,
    };
    // console.log(transaction.details);
    // -1 : status not paid
    let result = await TransactionService.createNewTransaction(transaction, -1);
    res.send({ message: result });
  }

  async updateStatusMomo(req, res) {
    const payload = {
      partnerCode: req.body.partnerCode,
      orderId: req.body.orderId,
      requestId: req.body.requestId,
      amount: req.body.amount,
      orderInfo: req.body.orderInfo,
      orderType: req.body.orderType,
      transId: req.body.transId,
      resultCode: req.body.resultCode,
      message: req.body.message,
      payType: req.body.payType,
      responseTime: req.body.responseTime,
      extraData: req.body.extraData,
      signature: req.body.signature,
    };
    // let transactionId = req.params.id;
    // let status = req.body.status;
    const data = await TransactionService.updateStatusMomo(payload);
    return res.send(data);
  }
}

module.exports = TransactionController;
