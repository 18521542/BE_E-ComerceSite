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
      attributes: [
        'id',
        'name',
        'description',
        'quantity',
        'price',
        'image_url',
      ],
    });
  }

  static findBookById(bookid) {
    return modelBook.findByPk(bookid);
  }

  static findBookAuthorById(authorid, bookid) {
    return modelBookAuthor.findAll({
      where: {
        book_id: bookid,
      },
    });
  }

  static findAllBookByOffset(offset, page, limit){

    const defaultLimit = 5;

    let limitNumber = Number(limit) || defaultLimit
    let pageNumber = (page-1) * limitNumber;

    return modelBook.findAll({
      limit: parseInt(limit) || defaultLimit,
      offset: pageNumber || parseInt(offset) || 0,
    });
  }

  static findBookCategoryById(categoryid, bookid) {
    return modelBookCategory.findAll({
      where: {
        book_id: bookid,
      },
    });
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
              image_url: newBook.image_url,
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

  static async updateBook(book) {
    const resultFindBook = await this.findBookById(book.id);
    // check if id's existed or not
    if (!resultFindBook) {
      return 'Not found test with this id';
    } else if (!book.author_id || book.author_id.length == 0) {
      return 'author_id is null. Please input at least one author';
    } else if (!book.category_id || book.category_id.length == 0) {
      return 'category_id is null. Please input at least one category';
    } else {
      const t = await db.transaction();
      try {
        const result = await db.transaction(async (t) => {
          resultFindBook.name = book.name;
          resultFindBook.price = book.price;
          resultFindBook.quantity = book.quantity;
          resultFindBook.updated_at = book.updated_at;
          resultFindBook.image_url = book.image_url;
          await resultFindBook.save({ transaction: t });

          // Destroy all the books and categories
          await modelBookAuthor.destroy(
            { where: { book_id: book.id } },
            { transaction: t },
          );

          await modelBookCategory.destroy(
            { where: { book_id: book.id } },
            { transaction: t },
          );

          const idBookAuthor = book.author_id;
          const idBookCategory = book.category_id;

          if (idBookAuthor && idBookAuthor.length > 0) {
            // set author and book in db BookAuthor
            for (const element of idBookAuthor) {
              await modelBookAuthor.create(
                {
                  book_id: book.id,
                  author_id: element,
                },
                {
                  transaction: t,
                },
              );
            }
          }
          if (idBookCategory && idBookCategory.length > 0) {
            for (const element of idBookCategory) {
              await modelBookCategory.create(
                {
                  book_id: book.id,
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
                where: { id: book.author_id },
              },
              {
                model: modelCategory,
                as: 'category',
                through: { attributes: [] },
                attributes: ['id'],
                where: { id: book.category_id },
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
  }

  static async getBookByAuthor(authorId) {
    return modelBook.findAll({
      include: [
        {
          model: modelAuthor,
          as: 'author',
          through: { attributes: [] },
          attributes: ['id', 'name'],
          where: { id: authorId },
        },
        {
          model: modelCategory,
          as: 'category',
          through: { attributes: [] },
          attributes: ['id', 'name'],
        },
      ],
      attributes: [
        'id',
        'name',
        'description',
        'quantity',
        'price',
        'image_url',
      ],
    });
  }

  static async getBookByCategory(categoryId) {
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
          where: { id: categoryId },
        },
      ],
      attributes: [
        'id',
        'name',
        'description',
        'quantity',
        'price',
        'image_url',
      ],
    });
  }
}

module.exports = BookService;
