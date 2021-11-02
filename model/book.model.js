module.exports = (sequelize, DataType) => {
  const book = sequelize.define(
    'book',
    {
      id: {
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        primaryKey: false,
      },
      description: {
        type: DataType.STRING,
        allowNull: true,
        primaryKey: false,
      },
      quantity: {
        type: DataType.INTEGER,
        allowNull: true,
        primaryKey: false,
      },
      price: {
        type: DataType.BIGINT,
        allowNull: true,
        primaryKey: false,
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
      tableName: 'book',
      underscored: true,
    },
  );

  book.associate = (models) => {
    book.belongsToMany(models.Author, {
      through: 'book_author',
      as: 'author',
      foreignKey: 'book_id',
    });

    book.belongsToMany(models.Category, {
      through: 'book_category',
      as: 'category',
      foreignKey: 'book_id',
    });
  };

  return book;
};
