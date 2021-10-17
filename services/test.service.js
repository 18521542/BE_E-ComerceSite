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

  static findTestInTable(dataprop) {
    return new Promise(async (resolve, reject) => {
      try {
        let resTest = await model.getInstance().Test.findOne({
          where: {
            id: dataprop,
          },
          raw: false,
        });
        if (resTest) {
          resolve({
            found: 1,
            message: 'Found Test with the id is ' + dataprop + ' .',
            test: resTest,
          });
        } else {
          resolve({
            found: 0,
            message: 'Data is not found',
          });
        }
      } catch (e) {
        reject(e);
      }
    });

    // return () => {
    //   let resTest = modelTest
    //     .findOne({
    //       where: {
    //         id: dataprop,
    //       },
    //       raw: false,
    //     })
    //     .then(  resTest ? 0 : 1);
    // };
  }

  static createNewTest(newTest) {
    return new Promise(async (resolve, reject) => {
      try {
        const resultFindTest = await this.findTestInTable(newTest.id);
        // check if id's existed or not
        if (resultFindTest.found == 0) {
          await model.getInstance().Test.create({
            id: newTest.id,
            name: newTest.name,
            created_at: newTest.created_at,
            updated_at: newTest.updated_at,
          });
          resolve('successfully created');
        } else {
          resolve('duplicate primary key, please check again!');
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  static updateTest(newTest) {
    return new Promise(async (resolve, reject) => {
      try {
        const resultFindTest = await this.findTestInTable(newTest.id);
        // check if id's existed or not
        if (resultFindTest.found == 1) {
          resultFindTest.test.name = newTest.name;
          resultFindTest.test.updated_at = newTest.updated_at;
          await resultFindTest.test.save();
          resolve('successfully UPDATED ');
        } else {
          resolve('Not found test with this id');
        }
      } catch (e) {
        reject(e);
      }
    });
  }
}

module.exports = TestService;
