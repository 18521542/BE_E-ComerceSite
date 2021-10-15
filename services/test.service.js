const model = require('../model')

// find Test by property in table 
const findTestInTable = (dataprop) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resTest = await model.getInstance().Test.findOne({
                where: {
                    id: dataprop,
                },
                raw: false
            })
            if (resTest) {
                resolve({
                    found: 1,
                    message: "Found Test with the id is " + dataprop + " .",
                    test: resTest,
                })
            }
            else {
                resolve({
                    found: 0,
                    message: "Data is not found"
                })
            }
        }
        catch(e) {
            reject(e);
        }
    })
}

// find All the value in table Test
const getAllTest = () => {
 return new Promise(async (resolve, reject) => {
        try {
            let test = await model.getInstance().Test.findAll({
                raw:true,
            });
            resolve(test);
        }
        catch(e) {
            reject(e);
        }
    })
}

let findTestById = (testid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let test = await model.getInstance().Test.findByPk(testid);
            resolve(test);
        }
        catch(e) {
            reject(e);
        }
    })
}

let createNewTest = (newTest) => {
     return new Promise(async (resolve, reject) => {
        try {
            const resultFindTest = await findTestInTable(newTest.id);
            // check if id's existed or not
            if (resultFindTest.found == 0) 
            {
                await model.getInstance().Test.create({
                    id: newTest.id,
                    name: newTest.name,
                    created_at: newTest.created_at,
                    updated_at: newTest.updated_at,
                });
                resolve("successfully created")
            }
            else 
            {
                resolve("duplicate primary key, please check again!")
            }
        }
        catch(e) {
            reject(e);
        }
    })
}

updateTest = (newTest) => {
    return new Promise(async (resolve, reject) => {
        try {
            const resultFindTest = await findTestInTable(newTest.id);
            // check if id's existed or not
            if (resultFindTest.found == 1) 
            {
                resultFindTest.test.name = newTest.name;
                resultFindTest.test.updated_at = newTest.updated_at;
                await resultFindTest.test.save();
                resolve("successfully UPDATED ")
            }
            else 
            {
                resolve("Not found test with this id");
            }
        }
        catch(e) {
            reject(e);
        }
    })
}


module.exports = { 
    getAllTest,
    findTestById,
    createNewTest,
    updateTest,
}