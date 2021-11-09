async function up(queryInterface, DataType) {
  await queryInterface.createTable('transaction', {
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
      references: { model: 'account', key: 'username' },
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
  await queryInterface.dropTable('transaction');
}

module.exports = { up, down };
