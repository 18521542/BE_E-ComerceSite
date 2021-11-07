async function up(queryInterface, DataType) {
  await queryInterface.createTable('shipper', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    telephone: {
      type: DataType.STRING,
      allowNull: true,
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
  await queryInterface.dropTable('shipper');
}

module.exports = { up, down };
