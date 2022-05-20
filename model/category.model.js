module.exports = (sequelize, DataType) => {
  const category = sequelize.define(
    'category',
    {
      category_id: {
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
      },
      id: {
        type: DataType.UUID,
        allowNull: false,
        primaryKey: true,
      },
      name: {
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
      tableName: 'category',
      underscored: true,
    },
  );

  category.associate = (models) => {
    category.belongsToMany(models.Book, {
      through: 'book_category',
      as: 'book',
      foreignKey: 'category_id',
    });
  };

  return category;
};
