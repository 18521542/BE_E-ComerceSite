const express = require("express")
const model = require("./model/DB_Access_Helper")

const app = express();

let port = process.env.port || 3000;

app.get("/", function (req, res) {
    res.send("API is running...");
});

app.get("/test", (req,res)=>{
    let connect = model.connect();
    res.status(200).send({message:"connect success"})
})

app.listen(port, ()=>{
    console.log(`app is listening on ${port}`)
})