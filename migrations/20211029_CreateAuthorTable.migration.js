async function up(queryInterface, DataType) {
  await queryInterface.createTable('author', {
    id: {
      type: DataType.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    telephone: {
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
  await queryInterface.dropTable('author');
}

module.exports = { up, down };
