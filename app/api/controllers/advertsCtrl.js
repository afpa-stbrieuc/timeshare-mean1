var express = require('express');
var multer = require('multer');


var router = express.Router();

var Advertdb = require('../models/adverts');


router.get('/', function(req, res) {
    console.log("data received by GET request");

    Advertdb.find({}, null, {
        sort: {
            created_at: -1
        }
    }, function(err, adverts) {
        if (err)
            res.send(err);
        console.log('deja la', adverts);
        res.json(adverts);
        console.log('GET:', adverts);
    });
});


router.post('/', function(req, res) {

    console.log('Post req.body', req.body);

    var advert = new Advertdb(); // create a new instance of the Advert model
    advert.type = req.body.type;
    advert.title = req.body.title;
    advert.author = req.body.author;
    advert.content = req.body.content;
    advert.media = 'abc';
    advert.loc = req.body.loc;
    advert.regions = req.body.regions;
    advert.categories = req.body.categories;
    advert.work_date = req.body.work_date;
    advert.work_duration_estimated = req.body.work_duration_estimated;
    advert.created_at = req.body.created_at;
    advert.updated_at = req.body.updated_at;
    advert.published = req.body.published;
    advert.answered = req.body.answered;
    advert.confirmed = req.body.confirmed;
    advert.helper = req.body.helper;
    advert.work_duration_real = req.body.work_duration_real;

    advert.save(function(err) {
        if (err)
            res.send(err);

        res.json(advert);
        console.log('Saved:', advert);
    });
});


router.delete('/:advert_id', function(req, res) {
    console.log(req.params.advert_id);
    Advertdb.remove({
        _id: req.params.advert_id
    }, function(err, advert) {
        if (err)
            res.send(err);

        res.json({
            message: 'Successfully deleted'
        });
    });

});

router.get('/:advert_id', function(req, res) {

    Advertdb.findById(req.params.advert_id, function(err, advert) {
        if (err)
            res.send(err);
        res.json(advert);
        console.log('Edit:', advert);
    });

});


router.put('/:advert_id', function(req, res) {

    Advertdb.findById(req.params.advert_id, function(err, advert) {

        if (err)
            res.send(err);
        advert.type = req.body.type;
        advert.author = req.body.author;
        advert.content = req.body.content;
        advert.media = media;
        console.log('advert.media : ', media);
        advert.loc = req.body.loc;
        advert.regions = req.body.regions;
        advert.categories = req.body.categories;
        advert.work_date = req.body.work_date;
        advert.work_duration_estimated = req.body.work_duration_estimated;
        advert.created_at = req.body.created_at;
        advert.updated_at = req.body.updated_at;
        advert.published = req.body.published;
        advert.answered = req.body.answered;
        advert.confirmed = req.body.confirmed;
        advert.helper = req.body.helper;
        advert.work_duration_real = req.body.work_duration_real;

        advert.save(function(err) {
            if (err)
                res.send(err);

            res.json(advert);
            console.log('Updated:', advert);
        });

    });
});

router.get('/searchAll/:advert_type/:advert_region/:advert_cat', function(req, res) {
    console.log('params requete', req.params.advert_type, req.params.advert_region);
    Advertdb.find({
        type: req.params.advert_type,
        regions: req.params.advert_region,
        categories: req.params.advert_cat
    }, function(err, adverts) {
        if (err)
            res.send(err);

        res.json(adverts);
        console.log('requeteAll', adverts);
        req.params.advert_type = " ";
        req.params.advert_region = " ";
        req.params.advert_cat = " ";
        console.log('voila les params : ', req.params.advert_type, req.params.advert_region, req.params.advert_cat);
    });

});

router.get('/searchType/:advert_type', function(req, res) {
    console.log('req Type : ', req.params.advert_type);
    Advertdb.find({
        type: req.params.advert_type
    }, function(err, adverts) {
        if (err)
            res.send(err);

        res.json(adverts);
        console.log('type', adverts);
        console.log('voila le params : ', req.params.advert_type);
    });
});
router.get('/searchRegion/:advert_region', function(req, res) {
    console.log('req Region : ', req.params.advert_region);
    Advertdb.find({
        regions: req.params.advert_region
    }, function(err, adverts) {
        if (err)
            res.send(err);

        res.json(adverts);
        console.log('region', adverts);
    });
});
router.get('/searchCat/:advert_cat', function(req, res) {
    console.log('req Cat : ', req.params.advert_cat);
    Advertdb.find({
        categories: req.params.advert_cat
    }, function(err, adverts) {
        if (err)
            res.send(err);

        res.json(adverts);
        console.log('cat', adverts);
    });
});

router.get('/searchTypeRegion/:advert_type/:advert_region', function(req, res) {
    console.log('req requete', req.params.advert_type, req.params.advert_region);
    Advertdb.find({
        type: req.params.advert_type,
        regions: req.params.advert_region
    }, function(err, adverts) {
        if (err)
            res.send(err);

        res.json(adverts);
        console.log('requeteTR', adverts);
        req.params.advert_type = " ";
        req.params.advert_region = " ";
        console.log('voila les params : ', req.params.advert_type, req.params.advert_region);
    });
});
router.get('/searchTypeCat/:advert_type/:advert_cat', function(req, res) {
    console.log('req requete', req.params.advert_type, req.params.advert_cat);
    Advertdb.find({
        type: req.params.advert_type,
        categories: req.params.advert_cat
    }, function(err, adverts) {
        if (err)
            res.send(err);

        res.json(adverts);
        console.log('requeteTC', adverts);
        req.params.advert_type = " ";
        req.params.advert_cat = " ";
        console.log('voila les params : ', req.params.advert_type, req.params.advert_cat);
    });
});
router.get('/searchRegionCat/:advert_region/:advert_cat', function(req, res) {
    console.log('req requete', req.params.advert_region, req.params.advert_cat);
    Advertdb.find({
        regions: req.params.advert_region,
        categories: req.params.advert_cat
    }, function(err, adverts) {
        if (err)
            res.send(err);

        res.json(adverts);
        console.log('requeteRC', adverts);
    });

});

/** API path that will upload the files */
router.post('/upload', function(req, res) {
    var storage = multer.diskStorage({ //multers disk storage settings
        destination: function(req, file, cb) {
            cb(null, '../public/uploads/')
        },
        filename: function(req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
            console.log('FILE: ', file);
        }

    });

    var upload = multer({ //multer settings
        storage: storage
    }).single('file');

    console.log("Chargement fichier...");

    upload(req, res, function(err) {

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

router.get('/responseToAd/:advert_id', function(req, res) {

    Advertdb.findById(req.params.advert_id, function(err, advert) {
        if (err)
            res.send(err);
        res.json(advert);
        console.log('Edit:', advert);
    });

});
//
////recupere media par nom=file in db
//router.get('/getFile/:media_file', function (req, res) {
//
//    Mediadb.find({file: media}, function (err, media) {
//        if (err)
//            res.send(err);
//        res.json(media);
//        console.log('Edit:', media);
//    });
//console.log('SavedMedia:', media.file);
//
//});



module.exports = router