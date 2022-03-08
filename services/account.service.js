const connection = require('../database/connect');
const db = connection.getConnection();
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
    const result = {
      message: '',
    };
    if (resFindAccount) {
      result.message = 'The account is existed, please check again!';
    } else {
      // check mail and password (NOT DONE)
      // .....

      // create new account & hash the password with bcrypt
      let hashPassword = await this.hashPassword(newAccount.password);
      // let typeAccount = newAccount.type ? newAccount.type : 0;
      await modelAccount.create({
        username: newAccount.username,
        password: hashPassword,
        photo: newAccount.photo,
        name: newAccount.name,
        telephone: newAccount.telephone,
        address: newAccount.address,
        email: newAccount.email,
        type: 0,
        created_at: newAccount.currentDate,
        updated_at: newAccount.currentDate,
      });
      result.message = 'successfully created';
    }
    return result;
  }

  static async updateAccount(account) {
    const resultFindAccount = await this.findAccount(account.username);
    // check if id's existed or not
    if (!resultFindAccount) {
      return 'Not found account with this username';
    } else {
      const t = await db.transaction();
      try {
        const result = await db.transaction(async (t) => {
          resultFindAccount.photo = account.photo;
          resultFindAccount.name = account.name;
          resultFindAccount.telephone = account.telephone;
          resultFindAccount.address = account.address;
          resultFindAccount.email = account.email;
          await resultFindAccount.save({ transaction: t });
        });
        const mess = {
          mess: 'update account info successfully',
          data: await modelAccount.findOne({
            where: {
              username: account.username,
            },
            raw: false,
          }),
        };
        return mess;
      } catch (err) {
        await t.rollback();
        return err.toString();
      }
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

  static async getAllAccount() {
    return modelAccount.findAll({
      raw: true,
    });
  }

  static async updateRole(account) {
    const resultFindAccount = await this.findAccount(account.username);
    // check if id's existed or not
    if (!resultFindAccount) {
      return 'Not found account with this username';
    } else {
      const t = await db.transaction();
      try {
        const result = await db.transaction(async (t) => {
          resultFindAccount.type = account.type;
          await resultFindAccount.save({ transaction: t });
        });
        const mess = {
          mess: 'set role account info successfully',
          data: await modelAccount.findOne({
            where: {
              username: account.username,
            },
            raw: false,
          }),
        };
        return mess;
      } catch (err) {
        await t.rollback();
        return err.toString();
      }
    }
  }

  static async changePassword(account) {
    const resultFindAccount = await this.findAccount(account.username);
    // check if id's existed or not
    if (!resultFindAccount) {
      return 'Not found account with this username';
    } else {
      const t = await db.transaction();
      try {
        let hashPassword = await this.hashPassword(account.newPassword);
        const result = await db.transaction(async (t) => {
          resultFindAccount.password = hashPassword;
          await resultFindAccount.save({ transaction: t });
        });
        const mess = {
          mess: 'set new password successfully',
          data: await modelAccount.findOne({
            where: {
              username: account.username,
            },
            raw: false,
          }),
        };
        return mess;
      } catch (err) {
        await t.rollback();
        return err.toString();
      }
    }
  }
}

module.exports = AccountService;
