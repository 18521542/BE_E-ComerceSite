const model = require('../model');
const BaseService = require('./base.service');

const modelAuthor = model.getInstance().Author;

class AuthorService extends BaseService {
  static getAllAuthor(offset, page, limit) {
    const defaultLimit = 4;

    let limitNumber = Number(limit) || defaultLimit
    let pageNumber = (page-1) * limitNumber;

    if(!offset && !page && !limit){
      return modelAuthor.findAll({
        raw: true,
      })
    }
    return modelAuthor.findAll({
      raw: true,
      limit: parseInt(limit) || defaultLimit,
      offset: pageNumber || parseInt(offset) || 0,
    });
  }

  static findAuthorById(authorId) {
    return modelAuthor.findByPk(authorId);
  }

  static async findAuthorInTable(dataprop, prop) {
    let resAuthor = await modelAuthor.findOne({
      where: {
        name: dataprop,
      },
      raw: false,
    });
    return resAuthor;
  }

  static async createNewAuthor(newAuthor) {
    const resultFindAuthor = await this.findAuthorInTable(newAuthor.name);
    // check if result is found or not
    if (resultFindAuthor) {
      return 'Name is existed, please check again!';
    } else {
      await modelAuthor.create({
        id: newAuthor.id,
        name: newAuthor.name,
        telephone: newAuthor.telephone,
        created_at: newAuthor.created_at,
        updated_at: newAuthor.updated_at,
      });
      const mess = {
        mess: 'add author successfully',
        data: {
          id: newAuthor.id,
          name: newAuthor.name,
          telephone: newAuthor.telephone,
        },
      };
      return mess;
    }
  }
}

module.exports = AuthorService;
