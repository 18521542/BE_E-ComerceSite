const model = require('../model');
const BaseService = require('./base.service');
const connection = require('../database/connect');
const db = connection.getConnection();

const modelTransaction = model.getInstance().Transaction;
const modelTransactionDetail = model.getInstance().Transaction_detail;

class TransactionService extends BaseService {
  static getAllTransaction() {
    return modelTransaction.findAll({});
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

  static async createNewTransaction(newTransaction) {
    const t = await db.transaction();
    try {
      const result = await db.transaction(async (t) => {
        await modelTransaction.create(
          {
            id: newTransaction.id,
            username: newTransaction.username,
            status: 'not delivery',
            price_total: '1000',
            updated_at: newTransaction.currentDate,
            created_at: newTransaction.currentDate,
          },
          {
            transaction: t,
          },
        );
        const transactionDetailList = newTransaction.detail;

        if (transactionDetailList && transactionDetailList.length > 0) {
          for (const element of transactionDetailList) {
            await modelTransactionDetail.create(
              {
                transaction_id: newTransaction.id,
                book_id: element.book_id,
                quantity: element.quantity,
                price_total: '10000',
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
            },
          ],
        }),
      };
      return mess;
    } catch (err) {
      await t.rollback();
      return err;
    }
  }
}

module.exports = TransactionService;
