const uuidv4 = require('uuid').v4;
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

  async retrieve(req, res) {
    const data = await BookService.findBookById(req.params.id);
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
    res.send({ message: result });
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

  // Filter author for getting book
  async filterAuthorList(req, res, next) {
    const authorId = req.params.id;
    const data = await BookService.getBookByAuthor(authorId);
    return res.send(data);
  }

  // Filter category for getting book
  async filterCategoryList(req, res, next) {
    const categoryId = req.params.id;
    const data = await BookService.getBookByCategory(categoryId);
    return res.send(data);
  }

  async getBooksTotal(req, res) {
    const data = await BookService.getBooksTotal();
    return res.send(data);
  }
}

module.exports = BookController;
