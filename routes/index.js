const express = require('express');
const router = express.Router();
const test = require("./test.routes");


router.use("/test", test )



module.exports = router;



