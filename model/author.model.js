module.exports = (sequelize, DataType) => {
  const author = sequelize.define(
    'author',
    {
      id: {
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      telephone: {
        type: DataType.STRING,
        allowNull: false,
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
      tableName: 'author',
      underscored: true,
    },
  );

  author.associate = (models) => {
    author.belongsToMany(models.Book, {
      through: 'book_author',
      as: 'book',
      foreignKey: 'author_id',
    });
  };
  return author;
};
