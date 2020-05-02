const express = require('express');
const fs = require('fs');
const mysql = require('mysql');
const app = express();

app.listen(3000);

/* CORS Headers */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* Read from DB Credentials File */
var data = fs.readFileSync('../DBAccess.json', 'utf8');
var credentials = JSON.parse(data);

/* Database Connection */
var connection = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database
});
connection.connect();

/* Database Login Credentials Query */
var sql = "SELECT * FROM cs_487_project.Login";
connection.query(sql, function (error, results, fields) {
  /* Send data via POST Method */
  app.post('/', function (req, res) {
    res.send(results);
  });
});

/* Database Item Entry Query */
var itemTable = "SELECT * FROM cs_487_project.item_log";
connection.query(itemTable, function (error, results, fields) {
  /* Send data via POST Method */
  app.post('/itemlog', function (req, res) {
    res.send(results);
  });
});

app.post('/itemClaim', function (req, res) {
  res.send();
  var itemTable = "UPDATE cs_487_project.item_log " +
    "SET timestamp_claimed = , SET userIDNumber = " +
    "WHERE timestamp = ";
  connection.query(itemTable, function (error, results, fields) {
    /* Send data via POST Method */

  });
});

connection.end();
