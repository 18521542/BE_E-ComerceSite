module.exports =  (sequelize, DataType)=>{
    const test = sequelize.define("test", {
        id: {
			type: DataType.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataType.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataType.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataType.DATE,
			allowNull: false
		}
    }, {
        tableName:'test',
        underscored: true
    })
    return test;
}