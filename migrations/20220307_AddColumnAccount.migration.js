async function up(queryInterface, DataType) {
  await queryInterface.addColumn('account', 'type', {
    type: DataType.INTEGER,
    allowNull: false,
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('account');
}

module.exports = { up, down };
