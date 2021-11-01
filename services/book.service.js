const model = require('../model');
const BaseService = require('./base.service');

const modelBook = model.getInstance().Book;

class BookService extends BaseService {
  static getAllBook() {
    return modelBook.findAll({
      raw: true,
    });
  }

  static findBookById(bookid) {
    return modelBook.findByPk(bookid);
  }

  static async findBookInTable(dataprop, prop) {
    let resBook = await modelBook.findOne({
      where: {
        name: dataprop,
      },
      raw: false,
    });
    return resBook;
  }

  static async createNewBook(newBook) {
    const resultFindBook = await this.findBookInTable(newBook.name);
    // check if result is found or not
    if (resultFindBook) {
      return 'Name is existed, please check again!';
    } else {
      await modelBook.create({
        id: newBook.id,
        name: newBook.name,
        description: newBook.telephone,
        price: newBook.price,
        quantity: newBook.quantity,
        created_at: newBook.created_at,
        updated_at: newBook.updated_at,
      });

      if (newBook.author_id && newBook.author_id.length > 0) {
        // set author and book in db BookAuthor
      }
      const mess = {
        mess: 'add Book successfully',
        data: {
          // update data
        },
      };
      return mess;
    }
  }
}

module.exports = BookService;
