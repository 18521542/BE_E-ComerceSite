module.exports = (sequelize, DataType) => {
  const transaction = sequelize.define(
    'transaction',
    {
      id: {
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
      },
      status: {
        type: DataType.STRING,
        allowNull: false,
      },
      ship_date: {
        type: DataType.STRING,
        allowNull: true,
      },
      price_total: {
        type: DataType.STRING,
        allowNull: false,
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
      tableName: 'transaction',
      underscored: true,
    },
  );
  transaction.associate = (models) => {
    transaction.belongsTo(models.Account, {
      foreignKey: 'username',
    });
  };
  return transaction;
};
