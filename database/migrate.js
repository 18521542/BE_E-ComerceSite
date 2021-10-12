const Umzug = require("umzug");

exports.migrate = (sequelizeInstance, path, db) => {
    return new Umzug({
        storage: 'sequelize',
        storageOptions:{
            sequelize: sequelizeInstance
        },
        migrations:{
            params:[
                sequelizeInstance.getQueryInterface(),
                sequelizeInstance.constructor,
                db,
                () =>{
                    throw new Error("Fail migrate")
                }
            ],
            path,
            pattern:/\.migration.js$/
        }
    });
}
