const express = require('express');
const testController = require('../controller/test.controller')
const router = express.Router();


router.get('/', testController.getAll);
router.get('/:id', testController.getId);
router.post('/create', testController.createTest);
router.put('/update', testController.updateTest);


module.exports = router;

