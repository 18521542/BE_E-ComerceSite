module.exports =  (sequelize, DataType)=>{
    const testModel = sequelize.define("testModel", {
        id:{
            type: DataType.UUID,
            allowNull: false,
            defaultValue: DataType.UUIDV4,
            primaryKey: true,
        },
        username:{
            type: DataType.STRING
        },
        password:{
            type: DataType.STRING
        }
    }, {
        tableName:'test_model',
        underscored: true
    })
    return testModel;
}