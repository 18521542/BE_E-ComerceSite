async function up(queryInterface) {
    return await queryInterface.sequelize.transaction(transaction =>
        queryInterface.sequelize.query(`
            ALTER TABLE book
            MODIFY description LONGTEXT
        `, { transaction })
    );
}

async function down(queryInterface) {
    return await queryInterface.sequelize.transaction(transaction =>
        queryInterface.sequelize.query(`
            ALTER TABLE book
            MODIFY description VARCHAR(50)
        `, { transaction })
    );
}

module.exports = { up, down };