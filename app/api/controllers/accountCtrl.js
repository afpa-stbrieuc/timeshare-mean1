var express = require('express');
var router = express.Router();

var Accountdb = require('../models/account');

<<<<<<< HEAD
router.get('/', function(req, res) {
=======
router.get('/account', function(req, res) {
>>>>>>> 95eb02c00c442c022011051243a7decfd33f06bf
	Accountdb.find(function(err, account) {
		if (err)
			res.send(err);

<<<<<<< HEAD

		res.json(account);



=======
		res.json(account);
>>>>>>> 95eb02c00c442c022011051243a7decfd33f06bf
	});
});

//add account
<<<<<<< HEAD
router.post('/', function(req, res) {

	console.log(req.body);
=======
router.post('/account', function(req, res) {

console.log(req.body);
>>>>>>> 95eb02c00c442c022011051243a7decfd33f06bf
	var account = new Accountdb(); // create a new instance of the Account model
	account.userid = req.body.userid; // set the Account userid (comes from the request)
	account.solde = req.body.solde;
	account.advertsid = req.body.advertsid;

	account.save(function(err) {
		if (err)
			res.send(err);

<<<<<<< HEAD

		res.json(201, account);


=======
		res.json(201, account);
>>>>>>> 95eb02c00c442c022011051243a7decfd33f06bf
	});


});

// get the Account with that id
<<<<<<< HEAD
router.get('/:account_id', function(req, res) {

	Accountdb.findById(req.params.account_id, function(err, account) {
		if (err)
			res.send(err);
		if (req.session.user) {
			res.json(201, account);

		} else {
			//req.session.error = 'Access denied!';
			//res.redirect('/login');
			res.json(404, account);
		}
		//	res.json(account);
	});
=======
router.get('/account/:account_id', function(req, res) {

		Accountdb.findById(req.params.account_id, function(err, account) {
			if (err)
				res.send(err);
			res.json(account);
		});
>>>>>>> 95eb02c00c442c022011051243a7decfd33f06bf

});

// update the account with this id
<<<<<<< HEAD
router.put('/:account_id', function(req, res) {

	if (req.params.account_id === undefined) return res.send(400, 'account id empty');
=======
router.put('/account/:account_id', function(req, res) {

	if (req.params.account_id === undefined) return res.send(400,'account id empty');
>>>>>>> 95eb02c00c442c022011051243a7decfd33f06bf

	Accountdb.findById(req.params.account_id, function(err, account) {

		if (err)
			res.send(err);
<<<<<<< HEAD
		account.userid = req.body.userid; // set the Account userid (comes from the request)
		account.solde = req.body.solde;
		account.advertsid = req.body.advertsid;
=======

		account.name = req.body.name;
>>>>>>> 95eb02c00c442c022011051243a7decfd33f06bf
		account.save(function(err) {
			if (err)
				res.send(err);

			res.json(account);
		});

<<<<<<< HEAD
	});
});

// delete the Todo with this id
router.delete('/:account_id', function(req, res) {
=======
	});	
});

// delete the Todo with this id
router.delete('/account/:account_id', function(req, res) {
>>>>>>> 95eb02c00c442c022011051243a7decfd33f06bf

	Accountdb.remove({
		_id: req.params.account_id
	}, function(err, account) {
		if (err)
			res.send(err);

		res.json({
			message: 'Successfully deleted'
		});
	});

});


module.exports = router