async function up(queryInterface, DataType ) {
	await queryInterface.createTable('test2', {
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
	});
}

async function down(queryInterface) {
	await queryInterface.dropTable('test2');
}

module.exports = { up, down };