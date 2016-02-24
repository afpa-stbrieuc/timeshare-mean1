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

//get by ID
router.get('/:advert_id', function (req, res) {
    Advertdb.findById(req.params.advert_id, function (err, advert) {
        if (err)
            res.send(err);
            res.json(advert);
            console.log('Advert Id GET:', advert);
    });
});
//get by ID
router.get('/editAdvert/:advert_id', function (req, res) {
    Advertdb.findById(req.params.advert_id, function (err, advert) {
        if (err)
            res.send(err);
            res.json(advert);
            console.log('Advert Id GET:', advert);
    });
});

router.get('/searchAuthor/:advert_author_id', function(req, res) {
    console.log('req Type : ', req.params.advert_author_id);
    Advertdb.find({
        author_id: req.params.advert_author_id,
        cancelled: false,
        answered : false
    }, function(err, adverts) {
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

//Update the advert from editAdvert.html
router.put('/:advert_id', function (req, res) {
    Advertdb.findById(req.params.advert_id, function (err, advert) {
        if (err)
            res.send(err);
        advert.type = req.body.type;
//        advert.author = req.body.author;
        advert.title = req.body.title;
        advert.content = req.body.content;
        advert.loc = req.body.loc;
        advert.regions = req.body.regions;
        advert.categories = req.body.categories;
//        advert.work_date = req.body.work_date;
//        advert.work_duration_estimated = req.body.work_duration_estimated;
//        advert.created_at = req.body.created_at;
        advert.updated_at = req.body.updated_at;
//        advert.answered = req.body.advert.answered;
        advert.cancelled = req.body.advert.cancelled;
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
//Update the advert marking it cancelled=true
router.put('/cancelled/:advert_id', function (req, res) {
    Advertdb.findById(req.params.advert_id, function (err, advert) {   
        if (err)
            res.send(err);
        advert.cancelled = true;
        advert.save(function (err) {
            if (err)
                res.send(err);
            res.json(advert);
            console.log('Ad cancelled:', advert);
        });
    });
});

router.get('/service/:advert_author_id', function (req, res) {
    console.log('req Type : ', req.params.advert_author_id);
    Advertdb.find({
        author_id: req.params.advert_author_id,
        cancelled: false,
        answered: true,
        finished: false
    }).populate({
        path: 'replies',
        match: {
            rep_approved: true}
    })
            .exec(function (err, advert) {
                if (err)
                    res.send(err);

                res.json(advert);
                console.log('Annonce validee/rep validée aussi:', advert);
            });
});


module.exports = router