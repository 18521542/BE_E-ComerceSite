async function up(queryInterface, DataType) {
  await queryInterface.createTable('account', {
    username: {
      type: DataType.STRING(30),
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
    },

    photo: {
      type: DataType.STRING,
      allowNull: true,
    },

    name: {
      type: DataType.STRING,
      allowNull: true,
    },
    telephone: {
      type: DataType.STRING,
      allowNull: true,
    },
    address: {
      type: DataType.STRING,
      allowNull: true,
    },
    email: {
      type: DataType.STRING,
      allowNull: true,
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
  await queryInterface.dropTable('account');
}

module.exports = { up, down };
