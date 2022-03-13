const Sequelize = require("sequelize");
const cls = require('continuation-local-storage') ;
const namespace = cls.createNamespace('back-end-ecommerce');

Sequelize.Validator.extend('isPositive', (val) => val >= 0);
// create sequelize instance with continuation local storage
Sequelize.useCLS(namespace);
const connection = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
        host: 'my-database-for-node-app',
        dialect: 'mysql', 
        logging: false,
        pool: {
            max: 100,
            min: 0,
            acquire: 30000,
            idle: 10000
        },      
        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        operatorsAliases: false
    }
);

exports.connect = function (){
    connection.authenticate()   
    .then(() => {
        console.log('Connection has been established successfully.');
        return connection;
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
        return undefined;
    });
}

exports.getConnection = () => connection
exports.getNamespace = () => namespace
exports.getSequelize = () => Sequelize
