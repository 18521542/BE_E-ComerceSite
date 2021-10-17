const TestService = require('../services/test.service');
const CRUD = require('./index');

class TestController extends CRUD {
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
    const data = await TestService.getAllTest();
    return res.send(data);
  }
  /**
   * retrieve - Retrieves a single item by ID.
   *
   * @function retrieve
   * @memberof module:controllers/CRUD
   * @param  {Object} req  Express request object
   * @param  {Object} res  Express response object
   * @param  {Function} next Express next middleware function
   */
  async retrieve(req, res) {
    let idTest = req.params.id;
    let data = await TestService.findTestById(idTest);
    res.send(data);
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
    let test = {
      id: req.body.id,
      name: req.body.name,
      created_at: currentDate,
      updated_at: currentDate,
    };
    let result = await TestService.createNewTest(test);
    res.send(result);
  }

  /**
   * update - Updates a single item given ID and that it exists.
   *
   * @function update
   * @memberof module:controllers/CRUD
   * @param  {Object} req  Express request object
   * @param  {Object} res  Express response object
   * @param  {Function} next Express next middleware function
   */
  async update(req, res, next) {
    let updatedDate = new Date();
    let updateTest = {
      id: req.params.id,
      name: req.body.name,
      updated_at: updatedDate,
    };
    let result = await TestService.updateTest(updateTest);
    res.send(result);
  }
}

module.exports = TestController;
