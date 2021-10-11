const Umzug = require("umzug");

export default (sequelizeInstance, path, db) =>{
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