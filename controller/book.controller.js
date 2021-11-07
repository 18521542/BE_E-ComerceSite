const uuidv4 = require('uuid');
const BookService = require('../services/book.service');
const CRUD = require('./index');

class BookController extends CRUD {
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
    const data = await BookService.getAllBook();
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
    let book = {
      id: uuidv4(),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      created_at: currentDate,
      updated_at: currentDate,
      author_id: req.body.author_id,
      category_id: req.body.category_id,
      image_url: req.body.image_url,
    };
    let result = await BookService.createNewBook(book);
    res.send(result);
  }

  async update(req, res, next) {
    let currentDate = new Date();
    let book = {
      id: req.params.id,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      updated_at: currentDate,
      author_id: req.body.author_id,
      category_id: req.body.category_id,
      image_url: req.body.image_url,
    };
    let result = await BookService.updateBook(book);
    res.send(result);
  }
}

module.exports = BookController;
