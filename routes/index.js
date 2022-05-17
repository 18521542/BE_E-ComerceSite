const express = require('express');
const router = express.Router();
const account = require('./account.routes');
const author = require('./author.routes');
const category = require('./category.routes');
const book = require('./book.routes');
const shop = require('./shop.routes');
const transaction = require('./transaction.routes');
const momo = require('./momo.js');

const fetch = require("cross-fetch")


router.use('/account', account);
router.use('/author', author);
router.use('/category', category);
router.use('/book', book);
router.use('/shop', shop);
router.use('/transaction', transaction);
router.use('/momo', momo);

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
    try {
        // console.log("here", mlAPI)
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
            message: "you haven't config ml url"
        })
    } catch (e) {
        res.send({
            message: "Something go wrong! Please try again!"
        })
    }
})

module.exports = router;
