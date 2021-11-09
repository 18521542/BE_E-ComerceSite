module.exports = (sequelize, DataType) => {
  const transaction_detail = sequelize.define(
    'transaction_detail',
    {
      transaction_id: {
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
        references: { model: 'transaction', key: 'id' },
      },
      book_id: {
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
        references: { model: 'book', key: 'id' },
      },
      quantity: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      price_total: {
        type: DataType.INTEGER,
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
      tableName: 'transaction_detail',
      underscored: true,
    },
  );
  transaction_detail.associate = (models) => {
    transaction_detail.belongsTo(models.Transaction, {
      foreignKey: 'id',
    });
    transaction_detail.belongsTo(models.Book, {
      foreignKey: 'id',
    });
  };
  return transaction_detail;
};
