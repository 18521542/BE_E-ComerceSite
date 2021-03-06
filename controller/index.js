/**
 * General CRUD Controller
 * @module controllers/CRUD
 */

const Sequelize = require('sequelize');
class CRUD {
  constructor(model, resourceName) {
    this.Model = model;
    this.resourceName = resourceName;

    // Bind this to methods
    this.list = this.list.bind(this);
    this.retrieve = this.retrieve.bind(this);
    this.destroy = this.destroy.bind(this);
    // this.update = this.update.bind(this);
    this.create = this.create.bind(this);
  }
  action(nameFunc) {
    return (req, res, next) => {
      this[nameFunc](req, res)
        .then((item) => {
          res.locals.responseData = item; //eslint-disable-line
          next();
        })
        .catch(next);
    };
  }
  /**
   * list - List all objects in the database
   *
   * @function list
   * @memberof  module:controllers/CRUD
   * @param  {Object} req  Express request object
   * @param  {Object} res  Express response object
   * @param  {Function} next Express next middleware function
   */
  list(req, res, next) {
    this.Model.findAll(req.query.filter).then(res.json.bind(res)).catch(next);
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
  retrieve(req, res, next) {
    this.Model.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((item) => {
        if (!item) throw new ResourceNotFoundError(this.resourceName);
        res.json(item);
      })
      .catch(next);
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
  update(req, res, next) {
    this.Model.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((item) => {
        if (!item) throw new ResourceNotFoundError(this.resourceName);
        return this.Model.update(req.body, {
          where: {
            id: req.params.id,
          },
        });
      })
      .then(() => res.sendStatus(204))
      .catch(Sequelize.ValidationError, (err) => {
        throw new ValidationError(err);
      })
      .catch(next);
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
  create(req, res, next) {
    this.Model.create(req.body)
      .then((item) => res.status(201).json(item))
      .catch(Sequelize.ValidationError, (err) => {
        throw new ValidationError(err);
      })
      .catch(next);
  }

  /**
   * destroy - Deletes an item given id and that the item exists
   *
   * @function destroy
   * @memberof module:controllers/crudController
   * @param  {Object} req  Express request object
   * @param  {Object} res  Express response object
   * @param  {Function} next Express next middleware function
   */
  destroy(req, res, next) {
    this.Model.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((count) => {
        if (!count) throw new ResourceNotFoundError(this.resourceName);
        res.sendStatus(204);
      })
      .catch(next);
  }
}

module.exports = CRUD;
