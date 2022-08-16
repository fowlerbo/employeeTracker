const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "abc",
  password: "server5698",
  database: "employees",
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;
