var express = require('express'),
        router = express.Router();
//        jwt = require('express-jwt'),
//        auth = jwt({
//            secret: process.env.JWT_SECRET,
//            userProperty: 'payload'
//        });
var multer = require('multer');
var passport = require('passport');

//var router = express.Router();

//var Advertdb = require('../models/adverts');


// API path that will upload the file
router.post('/', function (req, res) {
    var storage = multer.diskStorage({//multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, global.uploadDir)
        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
            console.log('FILE: ', file);
        }
    });
    var upload = multer({//multer settings
        storage: storage
    }).single('file');
    console.log("Chargement fichier...");

    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            res.json({
                error_code: 1,
                err_desc: err
            });
            return;
        }
        media = req.file.filename;
        console.log('SavedMedia:', media);
        res.json({
            error_code: 0,
            err_desc: null
        });
    });
});

module.exports = router
