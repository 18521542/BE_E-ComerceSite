require('dotenv').config();
const express = require('express');
const db = require('./database/main');
const model = require('./model');
const pathToMigration = `${__dirname}/migrations/`;
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};
const app = express();
const FE_HOST = process.env.FE_HOST;
app.use(cors({ credentials: true, origin: [FE_HOST, FE2_HOST] }));
let port = process.env.BE_PORT || 3000;

// package for getting value in cookie
app.use(cookieParser());
// body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect();
db.migrateDB(model.getInstance(), pathToMigration);

app.get('/', function (req, res) {
  res.send('API is running...');
});

app.use('/', routes);

https.createServer(options, app).listen(port, () => {
  console.log(`app is listening on ${port}`);
});
