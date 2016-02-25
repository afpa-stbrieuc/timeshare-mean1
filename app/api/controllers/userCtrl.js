var express = require('express');
var router = express.Router();

var passport = require('passport');
var mongoose = require('mongoose');

var User = require('../models/user');
var Account = require('../models/account');
      

var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

router.post('/inscription', function (req, res) {
    console.log("c est parti pour inscrire cette personne");
    if (!req.body.lastname || !req.body.firstname || !req.body.mail || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }
var account = new Account();
console.log('creation compte1', account);
    var user = new User();

    user.lastname = req.body.lastname;
    user.firstname = req.body.firstname;
    user.adress = req.body.adress;
    user.mail = req.body.mail;
    user.tel = req.body.tel;
    user.verified = false;
    user.media = 'avatar.ico';
    user.account_Id = account;
console.log ('creation compte2');

    user.setPassword(req.body.password);

    user.save(function (err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            console.log("generation token");
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token": token
            });
        }
    });
        console.log('PARAMS USER', user._id);
        account.user_Id = user._id; // set the Account userid (comes from the request)
//        console.log('PARAMS USER_ID', account.user_Id);
//
        account.save();
        
    
});

router.post('/login', function (req, res) {
    console.log("c est parti pour logger cette personne");
    if (!req.body.mail || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "All fields required"
        });
        return;
    }

    passport.authenticate('local', function (err, user, info) {
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

//get all users sorted by date desc
router.get('/', function (req,res) {
    User.find({}, null, {
    }, function (err, user) {
        if (err)
            res.send(err);
        res.json(user);
        console.log("All user GET:", user);
    });
});


router.get('/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        console.log('User media',user.media);
        console.log(user);
        res.json(user);
    });


});

router.put('/updateProfile', function (req, res) {
    console.log("c est parti pour mettre à jour ce profil");
    if (!req.body.lastname || !req.body.firstname || !req.body.mail || !req.body._id || !req.body.password) {
        sendJSONresponse(res, 400, {
            "message": "Vous avez tapé le mauvais mot de passe ou vous n'avez pas tapé votre pw"
        });
        return;
    }
    var user = User.findById(req.body._id, function (err, user) {
        console.log(user);

        if (user.validPassword(req.body.password)) {
            user.lastname = req.body.lastname;
            user.firstname = req.body.firstname;
            user.adress = req.body.adress;
            user.mail = req.body.mail;
            user.tel = req.body.tel;
            user.verified = false;
            console.log("mise à jour faite");
            console.log("generation token");
            token = user.generateJwt();
            sendJSONresponse(res, 200, {
                "token": token
            });

        } else {
            sendJSONresponse(res, 400, {
                "message": "Vous avez tapé le mauvais mot de passe"
            });
        }

    });
});

//Update the user with uploaded media file
router.put('/media/:user_id', function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
        if (err)
            res.send(err);
        user.media = media;
        console.log('user.media : ', media);
        user.save(function (err) {
            if (err)
                res.send(err);
            res.json(user);
            console.log('UpdatedMedia:', user);
        });
    });
});


module.exports = router;