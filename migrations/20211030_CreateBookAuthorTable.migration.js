async function up(queryInterface, DataType) {
  await queryInterface.createTable('book_author', {
    book_id: {
      type: DataType.UUID,
      references: { model: 'book', key: 'id' },
      allowNull: false,
      primaryKey: true,
    },
    author_id: {
      type: DataType.UUID,
      references: { model: 'author', key: 'id' },
      allowNull: false,
      primaryKey: true,
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
  await queryInterface.dropTable('book_author');
}

module.exports = { up, down };
