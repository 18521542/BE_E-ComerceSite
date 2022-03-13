require('dotenv').config();
const express = require('express');
const db = require('./database/main');
const model = require('./model');
const pathToMigration = `${__dirname}/migrations/`;
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

let port = process.env.BE_PORT || 3000;

// package for getting value in cookie
app.use(cookieParser());
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
