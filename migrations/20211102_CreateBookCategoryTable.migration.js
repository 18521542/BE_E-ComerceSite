async function up(queryInterface, DataType) {
  await queryInterface.createTable('book_category', {
    book_id: {
      type: DataType.UUID,
      references: { model: 'book', key: 'id' },
      allowNull: false,
      primaryKey: true,
    },
    category_id: {
      type: DataType.UUID,
      references: { model: 'category', key: 'id' },
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
  await queryInterface.dropTable('book_category');
}

module.exports = { up, down };
