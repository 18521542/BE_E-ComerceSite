const express = require("express")
const db = require("./database/main")
const model = require("./model")
const pathToMigration = `${__dirname}/migrations/`;

const app = express();

let port = process.env.BE_PORT || 3000;

db.connect();  
db.migrateDB(model.getInstance(), pathToMigration)

console.log(model.getInstance())
app.get("/", function (req, res) {
    res.send("API is running...");
});

app.listen(port, ()=>{
    console.log(`app is listening on ${port}`)
})