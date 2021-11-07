module.exports = (sequelize, DataType) => {
  const shipper = sequelize.define(
    'shipper',
    {
      id: {
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
      },
      telephone: {
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
      tableName: 'shipper',
      underscored: true,
    },
  );
  return shipper;
};
