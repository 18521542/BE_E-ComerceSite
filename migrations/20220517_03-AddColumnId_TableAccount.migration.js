async function up(queryInterface, DataType) {
  await queryInterface.addColumn('account', 'user_id', {
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('account');
}

module.exports = { up, down };
