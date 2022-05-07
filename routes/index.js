const express = require('express');
const router = express.Router();
const account = require('./account.routes');
const author = require('./author.routes');
const category = require('./category.routes');
const book = require('./book.routes');
const shop = require('./shop.routes');
const transaction = require('./transaction.routes');
const fetch = require("cross-fetch")
// fetch


router.use('/account', account);
router.use('/author', author);
router.use('/category', category);
router.use('/book', book);
router.use('/shop', shop);
router.use('/transaction', transaction);

var mlAPI = 'default';
router.get('/ML_API_URL', async (req, res) => {
    let flagAPI = req.body.mlURL;
    mlAPI = flagAPI;
    return res.send({
        result: mlAPI,
        message: "Get URL success"
    })
})

router.get(`/MLData`, async (req, res) => {
    console.log("here", mlAPI)
    if(mlAPI != 'default'){
        let requestToMLServer = await fetch(mlAPI, {
            "Content-type": "application/json"
        });
        let result = await requestToMLServer.json();
        return res.send({
            message: "you have config ml api",
            ML_API_URL: mlAPI,
            yourData: result
        })
    }

    return res.send({
        ml_url: mlAPI,
        message: "get haven't ml url success"
    })
})

module.exports = router;
