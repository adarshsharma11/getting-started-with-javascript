var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;

  con.query("CREATE DATABASE nodeblog", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});