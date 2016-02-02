var express = require('express');
var router = express.Router();
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

});



module.exports = router;