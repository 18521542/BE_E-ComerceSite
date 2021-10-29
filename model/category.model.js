module.exports = (sequelize, DataType) => {
  const category = sequelize.define(
    'category',
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
  return category;
};
