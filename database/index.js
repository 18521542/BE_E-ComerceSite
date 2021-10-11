const migrate = require("./migrate")

export function syncDB({force, db} = {}){
    return db.sequelize.sync({force});
}

export function migrateDB(db, path) {
    return migrate(db.sequelize, path).up();
}