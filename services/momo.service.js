const BaseService = require('./base.service');
class MomoService extends BaseService {
  static async createPayment(res) {
    let message;
    await res.on('data', async (body) => {
      console.log('Body: ');
      console.log(body);
      console.log('payUrl: ');
      console.log(JSON.parse(body).payUrl);
      message = {
        url: JSON.parse(body).payUrl,
      };
    });

    return message;
  }
}

module.exports = MomoService;
