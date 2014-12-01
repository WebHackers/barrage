var express = require('express');
var router = express.Router();
var socketInfo = require('../bin/socketInfo.js');
var home = require('../controller/home.js');

/* GET home page. */
router.get('/', function(req, res) {
  	res.render('index');
});

router.get('/list', function(req, res) {
	res.send(home.list(req, res, socketInfo));
});

router.get('/room/:id', function(req, res) {
	res.render('room');
});

router.get('/test', function(req, res) {
  	res.render('test');
});

module.exports = router;
