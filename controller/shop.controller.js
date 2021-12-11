const uuidv4 = require('uuid').v4;
const ShopService = require('../services/shop.service');
const CRUD = require('./index');

class ShopController extends CRUD {
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
    const data = await ShopService.getAllShop();
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
    let category = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      telephone: req.body.telephone,
      username: res.locals.user.account,
      created_at: currentDate,
      updated_at: currentDate,
    };
    let result = await ShopService.createNewShop(category);
    res.send(result);
  }
}

module.exports = ShopController;
