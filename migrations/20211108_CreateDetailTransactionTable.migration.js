async function up(queryInterface, DataType) {
  await queryInterface.createTable('transaction_detail', {
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
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('transaction_detail');
}

module.exports = { up, down };
