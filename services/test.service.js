const model = require('../model');
const BaseService = require('./base.service');

const modelTest = model.getInstance().Test;

class TestService extends BaseService {
  static getAllTest() {
    return modelTest.findAll({
      raw: true,
    });
  }

  static findTestById(testid) {
    return modelTest.findByPk(testid);
  }

  static async findTestInTable(dataprop) {
    let resTest = await modelTest.findOne({
      where: {
        id: dataprop,
      },
      raw: false,
    });
    return resTest;
  }

  static async createNewTest(newTest) {
    const resultFindTest = await this.findTestInTable(newTest.id);
    // check if result is found or not
    if (resultFindTest) {
      return 'duplicate primary key, please check again!';
    } else {
      await modelTest.create({
        id: newTest.id,
        name: newTest.name,
        created_at: newTest.created_at,
        updated_at: newTest.updated_at,
      });
      return 'successfully created';
    }
  }

  static async updateTest(newTest) {
    const resultFindTest = await this.findTestInTable(newTest.id);
    // check if id's existed or not
    if (resultFindTest) {
      resultFindTest.name = newTest.name;
      resultFindTest.updated_at = newTest.updated_at;
      await resultFindTest.save();
      return 'successfully UPDATED ';
    } else {
      return 'Not found test with this id';
    }
  }
}

module.exports = TestService;
