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
var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'apptimeshare@gmail.com',
    pass: 'vas voir ailleurs si j\'y suis!'
  }
});




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



//password reset

router.post('/reset', function (req, res) {
    console.log("encore un qui a perdu sa tête!");
    console.log(req.body.mail);
    if (!req.body.mail) {
        sendJSONresponse(res, 400, {
            "message": "vous devez tapper votre adresse mail (exemple@exemple.fr)"
        });
        return;
    };
        var user = User.findOne({ mail: req.body.mail }, function (err, user) {
        console.log(user);

        if (user) {
            var pwreset = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            user.setPassword(pwreset);
            console.log("mot de passe généré");

            var mailOptions = {
                from: "TimeShareApp <apptimeshare@gmail.com>",
                to: req.body.mail,
                subject: "TimeShare App - Confidentiel - Votre nouveau mot de passe",
                //        text:  // text//req.query.text
                html: '<p>Bonjour <b> '+ user.lastname +'!</b><br> Vous avez demandé de récupérer votre mot de passe <br> veuillez trouver ci dessous vos information de connexion : <br><b> email: ' + user.mail + ' <br> Mot de passe: ' + pwreset +'</b> <br><br> Merci de votre fidélité</p>'

            };
            console.log(mailOptions);
            transport.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                    res.json({
                        "message": "error de récupération"
                    });
                } else {
                    console.log('Message envoyé: ' + info.response);
                    sendJSONresponse(res, 200, {
                        "message": "veuillez consulté votre adresse mail , un message de récupération vous a été envoyé"
                    });
                };
            });
                     
           
        } else {
            console.log('Vous avez la mauvaise adresse mail');
            sendJSONresponse(res, 400, {
                "message": "Vous avez la mauvaise adresse mail"
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