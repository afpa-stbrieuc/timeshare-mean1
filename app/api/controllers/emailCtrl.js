var express = require('express'),
//        router = express.Router(),
        jwt = require('express-jwt'),
        auth = jwt({
            secret: process.env.JWT_SECRET,
            userProperty: 'payload'
        });
var multer = require('multer');
var passport = require('passport');

var router = express.Router();


var nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'carowebdev@gmail.com',
    pass: ''
  }
});

//router.get('/confirmRegistration'
//router.get('/resetPassword'
//router.get('/YourReplyGotApproved'

//var text = 'Hello world from \n\n' + req.body.name;



router.get('/send/:name/:mail/:subject', function (req, res) {
    var mailOptions = {
        from: "TimeShareApp <carowebdev@gmail.com>",
        to: req.params.mail,
        subject: req.params.subject,
//        text:  // text//req.query.text
        html: '<b>Yo '+ req.params.name +'. Tu me paies un café?</b>' 

    };
    console.log(mailOptions);
    transport.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
});

module.exports = router