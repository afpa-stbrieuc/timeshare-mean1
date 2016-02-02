var express = require('express');
var router = express.Router();
<<<<<<< HEAD

var User = require('../models/user');




// get one user
router.get('/:id', function(req, res) {
	User.findById(req.params.id, function(err, obj) {
		console.log('User GET:',obj);
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
	user.password = req.body.password;
	user.verified = false;


	//user = User(us);

	user.save(function(err) {
		if (err) {
			res.send(err);
			res.json(user);
			console.log(user);
		}



	});



	console.log('User Saved:',user);

});


// get all users




router.get('/', function(req, res) {
	console.log('hello');

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
=======
var User = require('../models/user');
var passport = require('passport');
var mongoose = require('mongoose');



var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

router.post('/inscription', function(req, res) {
  console.log("c est parti pour inscrire cette personne");
  if (!req.body.lastname || !req.body.firstname || !req.body.mail || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  var user = new User();

  user.lastname = req.body.lastname;
  user.firstname = req.body.firstname;
  user.adress = req.body.adress;
  user.mail = req.body.mail;
  user.tel = req.body.tel;
  user.verified = false;

  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token": token
      });
    }
  });

});

router.post('/login', function(req, res) {
  console.log("c est parti pour logger cette personne");
  if (!req.body.mail || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }

  passport.authenticate('local', function(err, user, info) {
    var token;

    if (err) {
      sendJSONresponse(res, 404, err);
      return;
    }

    if (user) {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token": token
      });
    } else {
      sendJSONresponse(res, 401, info);
    }
  })(req, res);
>>>>>>> 135b185a022da516d0fea0f51211b249b99f1ac4

});



module.exports = router;