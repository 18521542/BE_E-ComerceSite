const model = require('../model');
const BaseService = require('./base.service');

const modelBook = model.getInstance().Book;
const modelAuthor = model.getInstance().Author;
const modelBookAuthor = model.getInstance().Book_author;

class BookService extends BaseService {
  static getAllBook() {
    return modelBook.findAll({
      include: [
        {
          model: modelAuthor,
          as: 'author',
          through: { attributes: [] },
          attributes: ['id'],
        },
      ],
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
      return 'name is existed, please check again!';
    } else {
      await modelBook.create({
        id: newBook.id,
        name: newBook.name,
        description: newBook.description,
        price: newBook.price,
        quantity: newBook.quantity,
        created_at: newBook.created_at,
        updated_at: newBook.updated_at,
      });

      const idBookAuthor = newBook.author_id;
      if (idBookAuthor && idBookAuthor.length > 0) {
        // set author and book in db BookAuthor
        idBookAuthor.forEach(async (element) => {
          await modelBookAuthor.create({
            book_id: newBook.id,
            author_id: element,
          });
        });
      }
      const mess = {
        mess: 'Update successfully',
        data: await modelBook.findOne({
          includes: [
            {
              model: modelAuthor,
              as: 'author',
              // through: { attributes: [] },
              // attributes: ['id'],
              where: {
                id: newBook.id,
              },
            },
          ],
        }),
      };
      return mess;
    }
  }
}

module.exports = BookService;
