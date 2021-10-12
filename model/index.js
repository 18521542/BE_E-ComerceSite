const fs = require("fs")
const path = require("path")
const DB_Access_Helper = require("../database/connect")
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

//get connection-instance from db
const sequelize = DB_Access_Helper.getConnection();
const Sequelize = DB_Access_Helper.getSequelize();
const namespace = DB_Access_Helper.getNamespace();

const db = fs
    .readdirSync(__dirname)
    .filter(filename => /model.js$/.test(filename))
    .reduce((total, filename) => {
        const model = sequelize.import(path.resolve(__dirname, filename));
        total[capitalize(model.name)] = model; // eslint-disable-line
        return total;
    }, {});

/**
 * Sets up the associations for each model.
 * @param  {string} modelName
 */
Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

const total = {
    namespace,
    sequelize,
    Sequelize,
    ...db
}


exports.getInstance = () => {return total};