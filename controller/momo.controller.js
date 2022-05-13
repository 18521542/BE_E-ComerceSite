const uuidv4 = require('uuid').v4;
const MomoService = require('../services/momo.service');
const CRUD = require('./index');

class MomoController extends CRUD {
  async doRequest(options, requestBody) {
    return new Promise((resolve, reject) => {
      const https = require('https');
      const req = https.request(options, async (res) => {
        console.log(`Status: ${res.statusCode}`);
        console.log(`Headers: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        const payUrl = await MomoService.createPayment(res);

        // res.on('data', (chunk) => {
        //   responseBody += chunk;
        // });
        resolve(payUrl);

        res.on('end', () => {
          //   resolve('done');
        });
      });

      req.on('error', (err) => {
        reject(err);
      });

      req.write(requestBody);
      req.end();
    });
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
  async createMomoPayment(req, resp) {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var partnerCode = 'MOMOPH7P20220506';
    var accessKey = process.env.ACCESS_MOMO_KEY;
    var secretkey = process.env.SECRET_MOMO_KEY;
    var requestId = partnerCode + new Date().getTime();
    var orderId = requestId;
    var orderInfo = req.body.orderInfo;
    var redirectUrl = req.body.redirectUrl;
    var ipnUrl = 'http://10.0.141.74:5432/api/momo/ipn';
    // var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
    var amount = req.body.amount;
    var requestType = 'captureWallet';
    var extraData = ''; //pass empty value if your merchant does not have stores

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType;
    //puts raw signature
    console.log('--------------------RAW SIGNATURE----------------');
    console.log(rawSignature);
    //signature
    const crypto = require('crypto');
    var signature = crypto
      .createHmac('sha256', secretkey)
      .update(rawSignature)
      .digest('hex');
    console.log('--------------------SIGNATURE----------------');
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      accessKey: accessKey,
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      extraData: extraData,
      requestType: requestType,
      signature: signature,
      lang: 'en',
    });
    //Create the HTTPS objects
    const options = {
      //   mode: 'no-cors',
      hostname: 'test-payment.momo.vn',
      port: 443,
      path: '/v2/gateway/api/create',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody),
      },
    };
    const payUrl = await this.doRequest(options, requestBody);

    resp.send({
      ...payUrl,
      orderId: orderId,
    });
    //Send the request and get the response
  }

  async handleIPN(req, res) {
    let dataIPN = {
      resultCode: req.body.resultCode,
      message: req.body.message,
      orderId: req.body.orderId,
    };

    console.log('result', dataIPN);
    res.send(dataIPN);
  }
}

module.exports = MomoController;
