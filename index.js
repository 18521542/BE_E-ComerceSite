require('dotenv').config();
const express = require('express');
const db = require('./database/main');
const model = require('./model');
const pathToMigration = `${__dirname}/migrations/`;
const routes = require('./routes');

const app = express();

let port = process.env.BE_PORT || 3000;

// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect();
db.migrateDB(model.getInstance(), pathToMigration);
// console.log(model);

app.get('/', function (req, res) {
  res.send('API is running...');
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`app is listening on ${port}`);
});
