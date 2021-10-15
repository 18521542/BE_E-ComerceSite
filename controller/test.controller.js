 const testService = require('../services/test.service')
 const model = require('../model')

 getAll = async (req, res) => {
    let data = await testService.getAllTest();
    res.send(data);
 }

 getId = async (req,res) => {
   let idTest = req.params.id;
   let data = await testService.findTestById(idTest);
   res.send(data);
 }

 createTest = async (req,res) => {
    let currentDate = new Date();
    let test = {
       id: req.body.id,
       name: req.body.name,
       created_at: currentDate,
       updated_at: currentDate
    }
    let result = await testService.createNewTest(test);
    res.send(result);
   //  return res.send(200).json(result);
 }

 updateTest = async (req,res) => {
     let updatedDate = new Date();
     let updateTest = {
       id: req.body.id,
       name: req.body.name,
       updated_at: updatedDate,
    }
    let result = await testService.updateTest(updateTest);
   res.send(result);
 }





module.exports = {getAll, getId, createTest, updateTest};