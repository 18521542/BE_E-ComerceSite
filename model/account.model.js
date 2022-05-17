module.exports = (sequelize, DataType) => {
  const account = sequelize.define(
    'account',
    {
      user_id: {
        type: DataType.INTEGER,
        autoIncrement: true,
        unique: true,
      },
      username: {
        type: DataType.STRING(30),
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataType.INTEGER,
        allowNull: false,
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
    },
    {
      tableName: 'account',
      underscored: true,
    },
  );
  return account;
};
