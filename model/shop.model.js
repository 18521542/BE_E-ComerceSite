module.exports = (sequelize, DataType) => {
  const shop = sequelize.define(
    'shop',
    {
      id: {
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        allowNull: false,
      },
      address: {
        type: DataType.STRING,
        allowNull: false,
      },
      telephone: {
        type: DataType.STRING,
        allowNull: true,
      },
      username: {
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
      tableName: 'shop',
      underscored: true,
    },
  );
  shop.associate = (models) => {
    shop.belongsTo(models.Account, {
      foreignKey: 'fk_account',
    });
  };
  return shop;
};
