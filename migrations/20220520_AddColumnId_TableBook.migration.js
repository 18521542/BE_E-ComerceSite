async function up(queryInterface, DataType) {
  await queryInterface.addColumn('book', 'book_id', {
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
  });
}

async function down(queryInterface) {
  await queryInterface.dropTable('book');
}

module.exports = { up, down };
