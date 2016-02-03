var express = require('express');

var router = express.Router();

var Replydb = require('../models/replies');


router.get('/', function(req, res) {
    console.log("data received by GET request");

    Replydb.find({}, null, {
        sort: {
            created_at: -1
        }
    }, function(err, replies) {
        if (err)
            res.send(err);
        console.log('deja la', replies);
        res.json(replies);
        console.log('GET:', replies);
    });
});


router.post('/', function(req, res) {

    console.log('Post req.body', req.body);

    var reply = new Replydb(); // create a new instance of the Reply model
    reply.title = req.body.title;
    reply.author = req.body.author;
    reply.content = req.body.content;
    reply.created_at = req.body.created_at;
    reply.updated_at = req.body.updated_at;
    reply.published = req.body.published;
    reply.answered = req.body.answered;
    reply.confirmed = req.body.confirmed;
    reply.helper = req.body.helper;

    reply.save(function(err) {
        if (err)
            res.send(err);

        res.json(reply);
        console.log('SavedREPLY:', reply);
    });
});


router.delete('/:reply_id', function(req, res) {
    console.log(req.params.reply_id);
    Replydb.remove({
        _id: req.params.reply_id
    }, function(err, reply) {
        if (err)
            res.send(err);

        res.json({
            message: 'Successfully deleted'
        });
    });

});

router.get('/:reply_id', function(req, res) {

    Replydb.findById(req.params.reply_id, function(err, reply) {
        if (err)
            res.send(err);
        res.json(reply);
        console.log('Edit:', reply);
    });

});


router.put('/:reply_id', function(req, res) {

    Replydb.findById(req.params.reply_id, function(err, reply) {

        if (err)
            res.send(err);
        reply.author = req.body.author;
        reply.content = req.body.content;
        reply.created_at = req.body.created_at;
        reply.updated_at = req.body.updated_at;
        reply.published = req.body.published;
        reply.answered = req.body.answered;
        reply.confirmed = req.body.confirmed;
        reply.helper = req.body.helper;

        reply.save(function(err) {
            if (err)
                res.send(err);

            res.json(reply);
            console.log('Updated:', reply);
        });

    });
});

router.get('/searchAll/:reply_type/:reply_region/:reply_cat', function(req, res) {
    console.log('params requete', req.params.reply_type, req.params.reply_region);
    Replydb.find({
        type: req.params.reply_type,
        regions: req.params.reply_region,
        categories: req.params.reply_cat
    }, function(err, replies) {
        if (err)
            res.send(err);

        res.json(replies);
        console.log('requeteAll', replies);
        req.params.reply_type = " ";
        req.params.reply_region = " ";
        req.params.reply_cat = " ";
        console.log('voila les params : ', req.params.reply_type, req.params.reply_region, req.params.reply_cat);
    });

});

router.get('/searchType/:reply_type', function(req, res) {
    console.log('req Type : ', req.params.reply_type);
    Replydb.find({
        type: req.params.reply_type
    }, function(err, replies) {
        if (err)
            res.send(err);

        res.json(replies);
        console.log('type', replies);
        console.log('voila le params : ', req.params.reply_type);
    });
});
router.get('/searchRegion/:reply_region', function(req, res) {
    console.log('req Region : ', req.params.reply_region);
    Replydb.find({
        regions: req.params.reply_region
    }, function(err, replies) {
        if (err)
            res.send(err);

        res.json(replies);
        console.log('region', replies);
    });
});
router.get('/searchCat/:reply_cat', function(req, res) {
    console.log('req Cat : ', req.params.reply_cat);
    Replydb.find({
        categories: req.params.reply_cat
    }, function(err, replies) {
        if (err)
            res.send(err);

        res.json(replies);
        console.log('cat', replies);
    });
});

router.get('/searchTypeRegion/:reply_type/:reply_region', function(req, res) {
    console.log('req requete', req.params.reply_type, req.params.reply_region);
    Replydb.find({
        type: req.params.reply_type,
        regions: req.params.reply_region
    }, function(err, replies) {
        if (err)
            res.send(err);

        res.json(replies);
        console.log('requeteTR', replies);
        req.params.reply_type = " ";
        req.params.reply_region = " ";
        console.log('voila les params : ', req.params.reply_type, req.params.reply_region);
    });
});
router.get('/searchTypeCat/:reply_type/:reply_cat', function(req, res) {
    console.log('req requete', req.params.reply_type, req.params.reply_cat);
    Replydb.find({
        type: req.params.reply_type,
        categories: req.params.reply_cat
    }, function(err, replies) {
        if (err)
            res.send(err);

        res.json(replies);
        console.log('requeteTC', replies);
        req.params.reply_type = " ";
        req.params.reply_cat = " ";
        console.log('voila les params : ', req.params.reply_type, req.params.reply_cat);
    });
});
router.get('/searchRegionCat/:reply_region/:reply_cat', function(req, res) {
    console.log('req requete', req.params.reply_region, req.params.reply_cat);
    Replydb.find({
        regions: req.params.reply_region,
        categories: req.params.reply_cat
    }, function(err, replies) {
        if (err)
            res.send(err);

        res.json(replies);
        console.log('requeteRC', replies);
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

router.get('/replyToAd/:reply_id', function(req, res) {

    Replydb.findById(req.params.reply_id, function(err, reply) {
        if (err)
            res.send(err);
        res.json(reply);
        console.log('Edit:', reply);
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



