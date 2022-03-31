var express = require('express');
var router = express.Router();

var sqldb = require('mysql');
var connection = sqldb.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'rladmlqls335',
  database : 'profiling'
})

connection.connect(function(err) {
  if (!err){
    console.log('database is connected...')
  } else {
    console.log('Not found database')
  }
});




module.exports = router; 