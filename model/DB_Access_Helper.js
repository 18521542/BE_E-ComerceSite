var mysql = require("mysql");

//variable to check if db is connected or not
var connected = 0;

//config
var connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME|| "BookStore",
});

//method of db
exports.connect = function () {
  if (connected == 1) {
    return connection;
  }
  connected = 1;
  connection.connect(function (err) {
    if (!err) {
      console.log("DB connected");
      return connection;
    } else {
      console.log(`${err}`);
      return undefined;
    }
  });
};

exports.close = function () {
  connection.end(function (err) {
    if (!err) {
      console.log("DB close");
    }
  });
};

exports.getConnection = function () {
  return connection;
};

exports.executeQuerry = function (querryString){
  return new Promise((resolve, reject) => {
    connection.query(querryString, (err, rs)=>{
      if(err){
        reject(err)
        return;
      }
      resolve(rs)
    })
  })
}
