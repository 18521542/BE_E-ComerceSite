class BaseService {
  static async findProperty(att, dataprop) {
    let resTest = await modelTest.findOne({
      where: {
        'this.att': dataprop,
      },
      raw: false,
    });
    return resTest;
  }
}

module.exports = BaseService;
