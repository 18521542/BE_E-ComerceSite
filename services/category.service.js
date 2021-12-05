const model = require('../model');
const BaseService = require('./base.service');

const modelCategory = model.getInstance().Category;

class CategoryService extends BaseService {
  static getAllCategory() {
    return modelCategory.findAll({
      raw: true,
    });
  }
  static findCategoryById(categoryId) {
    return modelCategory.findByPk(categoryId);
  }

  static async findCategoryInTable(dataprop, prop) {
    let resCategory = await modelCategory.findOne({
      where: {
        name: dataprop,
      },
      raw: false,
    });
    return resCategory;
  }

  static async createNewCategory(newCategory) {
    const resultFindCategory = await this.findCategoryInTable(newCategory.name);
    // check if result is found or not
    if (resultFindCategory) {
      return 'Name is existed, please check again!';
    } else {
      await modelCategory.create({
        id: newCategory.id,
        name: newCategory.name,
        telephone: newCategory.telephone,
        created_at: newCategory.created_at,
        updated_at: newCategory.updated_at,
      });
      const mess = {
        mess: 'add category successfully',
        data: {
          id: newCategory.id,
          name: newCategory.name,
          telephone: newCategory.telephone,
        },
      };
      return mess;
    }
  }
}

module.exports = CategoryService;
