var express = require('express');
var router = express.Router();

var Accountdb = require('../models/account');

router.get('/account', function(req, res) {
	Accountdb.find(function(err, account) {
		if (err)
			res.send(err);

		res.json(account);
	});
});

//add account
router.post('/account/:userid:solde:advertsid', function(req, res) {

	var account = new Accountdb(); // create a new instance of the Account model
	account.userid = req.body.userid; // set the Account userid (comes from the request)
	account.solde = req.body.solde;
	account.advertsid = req.body.advertsid;

	account.save(function(err) {
		if (err)
			res.send(err);

		res.json(201, account);
	});


});

// get the Account with that id
router.get('/account/:account_id', function(req, res) {

		Accountdb.findById(req.params.account_id, function(err, account) {
			if (err)
				res.send(err);
			res.json(account);
		});

});

// update the Todo with this id
router.put('/account/:account_id', function(req, res) {

	if (req.params.account_id === undefined) return res.send(400,'todo id empty');

	Todo.findById(req.params.account_id, function(err, todo) {

		if (err)
			res.send(err);

		account.name = req.body.name;
		account.save(function(err) {
			if (err)
				res.send(err);

			res.json(account);
		});

	});	
});

// delete the Todo with this id
router.delete('/account/:account_id', function(req, res) {

	Todo.remove({
		_id: req.params.todo_id
	}, function(err, todo) {
		if (err)
			res.send(err);

		res.json({
			message: 'Successfully deleted'
		});
	});

});


module.exports = router