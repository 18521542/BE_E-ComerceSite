const Sequelize = require('sequelize');

let sequelizeConfig = {
    HOST: "my-database-for-node-app",
    PORT: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases: false
}   
module.exports = function testSel(){
    const sequelize = new Sequelize('BookStore', 'Trong', 'Trong2000', {
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
      });

}

