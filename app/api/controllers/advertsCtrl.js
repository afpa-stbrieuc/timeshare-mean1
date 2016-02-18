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

var Advertdb = require('../models/adverts');

//data posted from formController.js
router.post('/', function (req, res) {
    var advert = new Advertdb(); // create a new instance of the Advert model
    advert.type = req.body.type;
    advert.title = req.body.title;
    advert.author = req.body.author;
    advert.author_id = req.body.author_id;
    advert.content = req.body.content;
    advert.loc = req.body.loc;
    advert.regions = req.body.regions;
    advert.categories = req.body.categories;
    advert.work_date = req.body.work_date;
//    advert.work_duration_estimated = req.body.work_duration_estimated;
    advert.created_at = req.body.created_at;
//    advert.updated_at = req.body.updated_at;
//    advert.published = req.body.published;
//    advert.confirmed = req.body.confirmed;
//    advert.helper = req.body.helper;
//    advert.work_duration_real = req.body.work_duration_real;

    advert.save(function (err) {
        if (err)
            res.send(err);
        res.json(advert);
        console.log('Advert POST:', advert);
    });
});

//data to delete from profileCtrl.js
router.delete('/:advert_id', function (req, res) {
    Advertdb.remove({
        _id: req.params.advert_id
    }, function (err, advert) {
        if (err)
            res.send(err);
        res.json({
            message: 'Successfully deleted'
        });
    });
});

//get all adverts sorted by date desc
router.get('/', function (req,res) {
    Advertdb.find({}, null, {
        sort: {
            created_at: -1
        }
    }, function (err, adverts) {
        if (err)
            res.send(err);
        res.json(adverts);
        console.log("All adverts GET:", adverts);
    });
});

//edit advert (params userId and advert_id)
router.get('/:user_id/:advert_id', function (req, res) {
    Advertdb.find({
        author_id: req.params.user_id,
        _id:req.params.advert_id
    }, function (err, advert) {
        if (err)
//        {
            res.send(err);
//            	res.sendFile('404.html', {
//		'root': __dirname + '/../../public'
//	});
//        }else{
            res.json(advert);
            console.log('Advert Id GET:', advert);
//        }
    });
});

//get by authorID
router.get('/searchAuthor_id/:advert_author_id', function (req, res) {
    console.log('req Type : ', req.params.advert_author_id);
    Advertdb.find({
        author_id: req.params.advert_author_id
    }, function (err, adverts) {
        if (err)
            res.send(err);

        res.json(adverts);
        console.log('Adverts By authorID GET:', adverts);
    });
});

//API path that displays the advert selected to answer to
router.get('/replyToAd/:advert_id', function (req, res) {
    Advertdb.findById(req.params.advert_id, function (err, advert) {
        if (err)
            res.send(err);
        res.json(advert);
        console.log('Advert to reply:', advert);
    });
});

// API path that will upload the file
router.post('/upload', function (req, res) {
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

//Update the advert from editAdvert.html
router.put('/:advert_id', function (req, res) {
    Advertdb.findById(req.params.advert_id, function (err, advert) {
        if (err)
            res.send(err);
        advert.type = req.body.type;
//        advert.author = req.body.author;
        advert.content = req.body.content;
        advert.loc = req.body.loc;
        advert.regions = req.body.regions;
        advert.categories = req.body.categories;
//        advert.work_date = req.body.work_date;
//        advert.work_duration_estimated = req.body.work_duration_estimated;
//        advert.created_at = req.body.created_at;
        advert.updated_at = req.body.updated_at;
//        advert.published = req.body.published;
//        advert.confirmed = req.body.confirmed;
//        advert.helper = req.body.helper;
//        advert.work_duration_real = req.body.work_duration_real;

        advert.save(function (err) {
            if (err)
                res.send(err);
            res.json(advert);
            console.log('Advert Updated:', advert);
        });
    });
});

//Update the advert with uploaded media file
router.put('/media/:advert_id', function (req, res) {
    Advertdb.findById(req.params.advert_id, function (err, advert) {
        if (err)
            res.send(err);
        advert.media = media;
        console.log('advert.media : ', media);
        advert.save(function (err) {
            if (err)
                res.send(err);
            res.json(advert);
            console.log('UpdatedMedia:', advert);
        });
    });
});

//Update the advert pushing reply.id in advert.replies
router.put('/replies/:advert_id', function (req, res) {
    Advertdb.findById(req.params.advert_id, function (err, advert) {
        if (err)
            res.send(err);
        console.log("ad.replies", req.body.replies._id)
        advert.replies.push(req.body.replies._id);
        advert.save(function (err) {
            if (err)
                res.send(err);
            res.json(advert);
            console.log('UpdatedRepAD:', advert);
        });
    });
});

//Update the advert marking it answered=true
router.put('/answered/:advert_id', function (req, res) {
    Advertdb.findById(req.params.advert_id, function (err, advert) {
        if (err)
            res.send(err);
        advert.answered = true;
        advert.save(function (err) {
            if (err)
                res.send(err);
            res.json(advert);
            console.log('Ad answered:', advert);
        });
    });
});


module.exports = router