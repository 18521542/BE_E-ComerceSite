const model = require('../model');
const BaseService = require('./base.service');
const connection = require('../database/connect');
const db = connection.getConnection();

const modelTransaction = model.getInstance().Transaction;
const modelTransactionDetail = model.getInstance().Transaction_detail;
const sequelize = require('sequelize');

class TransactionService extends BaseService {
  static getAllTransaction() {
    return modelTransaction.findAll({
      include: [
        {
          model: modelTransactionDetail,
          as: 'transaction_detail',
          attributes: ['transaction_id', 'book_id', 'quantity', 'price_total'],
        },
      ],
    });
  }

  static getTransaction(username) {
    return modelTransaction.findAll({
      where: {
        username: username,
      },
      include: [
        {
          model: modelTransactionDetail,
          as: 'transaction_detail',
          attributes: ['transaction_id', 'book_id', 'quantity', 'price_total'],
        },
      ],
    });
  }

  static findTransactionById(transactionid) {
    return modelTransaction.findByPk(transactionid);
  }

  static async findTransactionInTable(dataprop, prop) {
    let resBook = await modelTransaction.findOne({
      where: {
        name: dataprop,
      },
      raw: false,
    });
    return resBook;
  }

  static async createNewTransaction(newTransaction, status = 0) {
    const t = await db.transaction();
    try {
      const result = await db.transaction(async (t) => {
        // consle.log(newTransaction.username);
        await modelTransaction.create(
          {
            id: newTransaction.id,
            username: newTransaction.username,
            status: status,
            price_total: newTransaction.price_total,
            updated_at: newTransaction.currentDate,
            created_at: newTransaction.currentDate,
          },
          {
            transaction: t,
          },
        );
        const transactionDetailList = await newTransaction.details;
        if (true) {
          for (const element of transactionDetailList) {
            await modelTransactionDetail.create(
              {
                transaction_id: newTransaction.id,
                book_id: element.book_id,
                quantity: element.quantity,
                price_total: element.price_total,
                updated_at: newTransaction.currentDate,
                created_at: newTransaction.currentDate,
              },
              {
                transaction: t,
              },
            );
          }
        }
      });

      // Return the message if create successfully
      const mess = {
        mess: 'create transaction successfully',
        data: await modelTransaction.findOne({
          include: [
            {
              model: modelTransactionDetail,
              as: 'transaction_detail',
              attributes: [
                'transaction_id',
                'book_id',
                'quantity',
                'price_total',
              ],
              where: { transaction_id: newTransaction.id },
            },
          ],
        }),
      };
      return mess;
    } catch (err) {
      await t.rollback();
      return err.toString();
    }
  }

  static async updateStatus(transactionId, status) {
    const resFindTransaction = await this.findTransactionById(transactionId);
    console.log(status);
    if (!resFindTransaction) {
      const mess = "mess: 'err not found";
      return mess;
    } else {
      const t = await db.transaction();
      try {
        const result = await db.transaction(async (t) => {
          resFindTransaction.status = status;
          await resFindTransaction.save({ transaction: t });
        });
        const mess = {
          mess: 'set status info successfully',
          data: await modelTransaction.findOne({
            where: {
              id: transactionId,
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

  static async getTopUser() {
    return modelTransaction.findAll({
      attributes: [
        'username',
        [sequelize.fn('sum', sequelize.col('price_total')), 'spending_total'],
        [sequelize.fn('count', sequelize.col('username')), 'orders_total'],
      ],
      order: [[sequelize.literal('spending_total'), 'DESC']],
      group: ['username'],
    });
  }

  static async getOrdersTotal() {
    return modelTransaction.findAll({
      attributes: [
        [sequelize.fn('count', sequelize.col('id')), 'orders_total'],
      ],
    });
  }

  static async getRevenueTotal() {
    return modelTransaction.findAll({
      attributes: [
        [sequelize.fn('sum', sequelize.col('price_total')), 'revenue_total'],
      ],
      where: {
        status: 1,
      },
    });
  }

  static async getLatestOrders() {
    return modelTransaction.findAll({
      include: [
        {
          model: modelTransactionDetail,
          as: 'transaction_detail',
          attributes: ['transaction_id', 'book_id', 'quantity', 'price_total'],
        },
      ],
      order: [['created_at', 'DESC']],
    });
  }

  static async updateStatusMomo(payload) {
    if (payload.resultCode == 0) {
      var accessKey = process.env.ACCESS_MOMO_KEY;
      var secretkey = process.env.SECRET_MOMO_KEY;
      const resFindTransaction = await this.findTransactionById(
        payload.orderId,
      );
      // console.log(status);
      if (!resFindTransaction) {
        const mess = "mess: 'err not found";
        return mess;
      } else {
        const t = await db.transaction();
        try {
          var rawSignature =
            'accessKey=' +
            accessKey +
            '&amount=' +
            payload.amount +
            '&extraData=' +
            payload.extraData +
            '&message=' +
            payload.message +
            '&orderId=' +
            payload.orderId +
            '&orderInfo=' +
            payload.orderInfo +
            '&orderType=' +
            payload.orderType +
            '&partnerCode=' +
            payload.partnerCode +
            '&payType=' +
            payload.payType +
            '&requestId=' +
            payload.requestId +
            '&responseTime=' +
            payload.responseTime +
            '&resultCode=' +
            payload.resultCode +
            '&transId=' +
            payload.transId;
          //signature
          const crypto = require('crypto');
          var signature = crypto
            .createHmac('sha256', secretkey)
            .update(rawSignature)
            .digest('hex');

          console.log('signature is', signature);

          if (signature == payload.signature) {
            const result = await db.transaction(async (t) => {
              resFindTransaction.status = 0;
              await resFindTransaction.save({ transaction: t });
            });
            const mess = {
              mess: 'set status info successfully',
              data: await modelTransaction.findOne({
                where: {
                  id: payload.orderId,
                },
                raw: false,
              }),
            };
            return mess;
          } else {
            const mess = {
              mess: 'there is sth wrong in payload with momo payment',
            };
            return mess;
          }
        } catch (err) {
          await t.rollback();
          return err.toString();
        }
      }
    }
  }
}

module.exports = TransactionService;
