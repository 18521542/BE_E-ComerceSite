async function up(queryInterface, DataType) {
  await queryInterface.createTable('rating', {
    book_id: {
      type: DataType.UUID,
      references: { model: 'book', key: 'id' },
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataType.STRING(30),
      references: { model: 'account', key: 'username' },
      allowNull: false,
      primaryKey: true,
    },
    rating_value: {
      type: DataType.INTEGER,
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
  await queryInterface.dropTable('rating');
}

module.exports = { up, down };
