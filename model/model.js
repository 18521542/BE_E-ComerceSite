const Sequelize = require('sequelize');

module.exports = function testSel(){
    const sequelize = new Sequelize(
        process.env.DB_NAME, 
        process.env.DB_USER, 
        process.env.DB_PASSWORD, {
            host: 'my-database-for-node-app',
            dialect: 'mysql', 
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            },      
            // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
            operatorsAliases: false
        }
    );
}

