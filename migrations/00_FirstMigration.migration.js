async function up(queryInterface, DataType) {
  await queryInterface.createTable('test', {
    id: {
      type: DataType.INTEGER,
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
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('test');
}

module.exports = { up, down };
