async function up(queryInterface, DataType) {
  await queryInterface.createTable('shop', {
    id: {
      type: DataType.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
    },
    address: {
      type: DataType.STRING,
      allowNull: false,
    },
    telephone: {
      type: DataType.STRING,
      allowNull: true,
    },
    username: {
      type: DataType.STRING,
      allowNull: false,
      references: { model: 'account', key: 'username' },
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
  await queryInterface.dropTable('shop');
}

module.exports = { up, down };
