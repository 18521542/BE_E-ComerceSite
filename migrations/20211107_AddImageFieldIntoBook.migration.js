async function up(queryInterface, DataType) {
  await queryInterface.addColumn('book', 'image_url', {
    type: DataType.STRING,
    allowNull: true,
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('book');
}

module.exports = { up, down };
