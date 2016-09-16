var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //var result = fs.readFile(__dirname)
  res.render('index', { title: 'Express' });
  console.log(123);
});

module.exports = router;
