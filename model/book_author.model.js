module.exports = (sequelize, DataType) => {
  const book_author = sequelize.define(
    'book_author',
    {
      book_id: {
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
      },
      author_id: {
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
      },
      created_at: {
        type: DataType.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataType.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'book_author',
      underscored: true,
    },
  );
  return book_author;
};
