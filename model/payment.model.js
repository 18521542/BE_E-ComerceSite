module.exports = (sequelize, DataType) => {
  const payment = sequelize.define(
    'payment',
    {
      id: {
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataType.INTEGER,
        allowNull: false,
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
      tableName: 'payment',
      underscored: true,
    },
  );
  return payment;
};
