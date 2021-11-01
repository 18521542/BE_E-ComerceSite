async function up(queryInterface, DataType) {
  await queryInterface.createTable('book', {
    id: {
      type: DataType.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      primaryKey: false,
    },
    description: {
      type: DataType.STRING,
      allowNull: true,
      primaryKey: false,
    },
    quantity: {
      type: DataType.INTEGER,
      allowNull: true,
      primaryKey: false,
    },
    price: {
      type: DataType.BIGINT,
      allowNull: true,
      primaryKey: false,
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
  await queryInterface.dropTable('book');
}

module.exports = { up, down };
