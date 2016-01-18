var express = require('express');
var router = express.Router();

var User = require('../models/user');




// get one user
router.get('/:id', function(req, res) {
	User.findById(req.params.id, function(err, obj) {
		console.log(obj);
		res.json(obj);
	});


});



// add user

router.post('/', function(req, res) {

	console.log(req.body);

	var user = new User();

	user.lastname = req.body.lastname;
	user.firstname = req.body.firstname;
	user.adress = req.body.adress;
	user.mail = req.body.mail;
	user.tel = req.body.tel;

	//user = User(us);

	user.save(function(err) {
		if (err) {
			res.send(err);
			res.json(user);
			console.log(user);
		}



	});



	console.log(user);

});


// get all users




router.get('/', function(req, res) {

	User.find(function(err, obj) {
		res.json(obj);
	});
});



//  update user


router.put('/:id', function(req, res) {


	var user = User.findById(req.params.id, function(err, user) {


		if (err) {
			console.log(err);
			res.status(500).send();
		} else {
			if (!user) {
				res.send(404).send();

			} else {

				if (req.body.lastname) {
					user.lastname = req.body.lastname;
				}
				if (req.body.firstname) {
					user.firstname = req.body.firstname;
				}
				if (req.body.adress) {
					user.adress = req.body.adress;
				}
				if (req.body.tel) {
					user.tel = req.body.tel;
				}
				if (req.body.mail) {
					user.mail = req.body.mail;
				}


				user.save(function(err) {
					if (err) {
						console.log(err);
						res.status(500).send();

					} else {

						res.json(user);
					}


				});

			}
		}



	});
});




// delete user 

router.delete('/:id', function(req, res) {

	User.remove(req.params.id, function(err, user) {

		if (err) {
			res.send(err);

		} else {

			res.json(user + ' deleted!');
		}

	})

});



module.exports = router;