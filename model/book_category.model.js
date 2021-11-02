module.exports = (sequelize, DataType) => {
  const book_category = sequelize.define(
    'book_category',
    {
      book_id: {
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
      },
      category_id: {
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
      tableName: 'book_category',
      underscored: true,
    },
  );
  return book_category;
};
