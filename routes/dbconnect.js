var express = require('express');
var router = express.Router();

var sqldb = require('mysql');
var connection = sqldb.createConnection({
  host : 'mysql',
  port : 3300,
  user : 'root',
  password : '1234',
  database : 'exampleDB'
})

connection.connect(function(err) {
  if (!err){
    console.log('database is connected...')
  } else {
    console.log('Not found database')
  }
});




module.exports = router; 