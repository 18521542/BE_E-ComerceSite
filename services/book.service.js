const model = require('../model');
const BaseService = require('./base.service');
const connection = require('../database/connect');
const db = connection.getConnection();

const modelBook = model.getInstance().Book;
const modelAuthor = model.getInstance().Author;
const modelCategory = model.getInstance().Category;
const modelBookAuthor = model.getInstance().Book_author;
const modelBookCategory = model.getInstance().Book_category;

class BookService extends BaseService {
  static getAllBook() {
    return modelBook.findAll({
      include: [
        {
          model: modelAuthor,
          as: 'author',
          through: { attributes: [] },
          attributes: ['id', 'name'],
        },
        {
          model: modelCategory,
          as: 'category',
          through: { attributes: [] },
          attributes: ['id', 'name'],
        },
      ],
      attributes: ['id', 'name', 'description', 'quantity', 'price'],
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
    } else if (!newBook.author_id || newBook.author_id.length == 0) {
      return 'author_id is null. Please input at least one author';
    } else if (!newBook.category_id || newBook.category_id.length == 0) {
      return 'category_id is null. Please input at least one category';
    } else {
      const t = await db.transaction();
      try {
        const result = await db.transaction(async (t) => {
          await modelBook.create(
            {
              id: newBook.id,
              name: newBook.name,
              description: newBook.description,
              price: newBook.price,
              quantity: newBook.quantity,
              created_at: newBook.created_at,
              updated_at: newBook.updated_at,
            },
            {
              transaction: t,
            },
          );

          const idBookAuthor = newBook.author_id;
          const idBookCategory = newBook.category_id;

          if (idBookAuthor && idBookAuthor.length > 0) {
            // set author and book in db BookAuthor
            for (const element of idBookAuthor) {
              await modelBookAuthor.create(
                {
                  book_id: newBook.id,
                  author_id: element,
                },
                {
                  transaction: t,
                },
              );
            }
          }
          if (idBookCategory && idBookCategory.length > 0) {
            // set category and book in db BookCategory
            for (const element of idBookCategory) {
              await modelBookCategory.create(
                {
                  book_id: newBook.id,
                  category_id: element,
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
          mess: 'add book successfully',
          data: await modelBook.findOne({
            include: [
              {
                model: modelAuthor,
                as: 'author',
                through: { attributes: [] },
                attributes: ['id'],
                where: { id: newBook.author_id },
              },
              {
                model: modelCategory,
                as: 'category',
                through: { attributes: [] },
                attributes: ['id'],
                where: { id: newBook.category_id },
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
}

module.exports = BookService;
