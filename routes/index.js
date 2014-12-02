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

router.get('/room/:id/:title', function(req, res) {
	var id = req.params.id;
	var title = req.params.title;
	if(/^r_[1-9]{1,1}[0-9]{2,}/.test(id)) {
		if(socketInfo.socket[id]) {
			res.render('room', {
				'title': title,
				'id': id.replace('r_', '')
			});
		}
		else {
			res.send('Can not find this room');
		}
	}
	else {
		res.send('Can not find this room');
	}
});

router.get('/test', function(req, res) {
  	res.render('test');
});

module.exports = router;
