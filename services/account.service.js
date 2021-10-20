const model = require('../model');
const BaseService = require('./base.service');
const bcrypt = require('bcrypt');
const saltRounds = bcrypt.genSaltSync(10);

const modelAccount = model.getInstance().Account;

class AccountService extends BaseService {
  static hashPassword(password) {
    return bcrypt.hashSync(password, saltRounds);
  }

  static async findAccount(dataprop) {
    let resAccount = await modelAccount.findOne({
      where: {
        username: dataprop,
      },
      raw: false,
    });
    return resAccount;
  }

  static async createnewAccount(newAccount) {
    const resFindAccount = await this.findAccount(newAccount.username);
    // check if result is found or not
    if (resFindAccount) {
      return 'The account is existed, please check again!';
    } else {
      // check mail and password
      // .....

      // create new account & hash the password with bcrypt
      let hashPassword = await this.hashPassword(newAccount.password);
      await modelAccount.create({
        username: newAccount.username,
        password: hashPassword,
        photo: newAccount.photo,
        name: newAccount.name,
        telephone: newAccount.telephone,
        address: newAccount.address,
        email: newAccount.email,
        created_at: newAccount.currentDate,
        updated_at: newAccount.currentDate,
      });
      return 'successfully created';
    }
  }

  static async checkAccount(data) {
    const resFindAccount = await this.findAccount(data.username);
    if (resFindAccount) {
      // if the username is correct, compare the password entered with the password in db
      return await bcrypt.compareSync(data.password, resFindAccount.password);
    } else {
      return false;
    }
  }
}

module.exports = AccountService;
