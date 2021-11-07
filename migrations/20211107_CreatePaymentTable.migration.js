async function up(queryInterface, DataType) {
  await queryInterface.createTable('payment', {
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
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('payment');
}

module.exports = { up, down };
