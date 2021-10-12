const DB_Access_Helper = require("./connect")
const DB_Migrate_Helper = require("./migrate")


exports.connect = () => {return DB_Access_Helper.connect()}
exports.migrateDB = (model, path) => {return DB_Migrate_Helper.migrate(model.sequelize, path).up()}
