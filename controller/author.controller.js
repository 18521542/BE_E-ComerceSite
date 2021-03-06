const uuidv4 = require('uuid').v4;
const AuthorService = require('../services/author.service');
const CRUD = require('./index');

class AuthorController extends CRUD {
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
    const { offset, page, limit } = req.query;
    const data = await AuthorService.getAllAuthor(offset, page, limit);
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
    console.log(uuidv4);
    let author = {
      id: uuidv4(),
      name: req.body.name,
      telephone: req.body.telephone,
      created_at: currentDate,
      updated_at: currentDate,
    };
    let result = await AuthorService.createNewAuthor(author);
    res.send(result);
  }

  async retrieve(req, res, next) {
    let authorId = req.params.id;
    let data = await AuthorService.findAuthorById(authorId);
    return res.send(data);
  }
}

module.exports = AuthorController;
