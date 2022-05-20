async function up(queryInterface, DataType) {
  await queryInterface.addColumn('category', 'category_id', {
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('category');
}

module.exports = { up, down };
