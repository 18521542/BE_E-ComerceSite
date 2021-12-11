const uuidv4 = require('uuid').v4;
const CategoryService = require('../services/category.service');
const CRUD = require('./index');

class CategoryController extends CRUD {
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
    const data = await CategoryService.getAllCategory();
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
    let category = {
      id: uuidv4(),
      name: req.body.name,
      created_at: currentDate,
      updated_at: currentDate,
    };
    let result = await CategoryService.createNewCategory(category);
    res.send(result);
  }

  async retrieve(req, res, next) {
    let categoryId = req.params.id;
    let data = await CategoryService.findCategoryById(categoryId);
    return res.send({ message: data });
  }
}

module.exports = CategoryController;
