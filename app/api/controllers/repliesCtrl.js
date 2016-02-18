var express = require('express');
var router = express.Router();
var Replydb = require('../models/replies');
//var Advertdb = require('../models/adverts');



//get all replies sorted by date desc
router.get('/', function (res) {
    Replydb.find({}, null, {
        sort: {
            created_at: -1
        }
    }, function (err, replies) {
        if (err)
            res.send(err);
        res.json(replies);
        console.log('GET all replies:', replies);
    });
});

//data posted from replyToAdController.js
router.post('/', function (req, res) {
    var reply = new Replydb(); // create a new instance of the Reply model
    reply.title = req.body.title;
    reply.author = req.body.author;
    reply.author_id = req.body.author_id;
    reply.toAdId = req.body.toAdId;
    reply.toAd_author = req.body.toAd_author;
    reply.content = req.body.content;
    reply.work_date = req.body.work_date;
    reply.created_at = req.body.created_at;
    reply.updated_at = req.body.updated_at;
//    reply.published = req.body.published;
    reply.confirmed = req.body.confirmed;
//    reply.helper = req.body.helper;

    reply.save(function (err) {
        if (err)
            res.send(err);
        res.json(reply);
        console.log('SavedREPLY:', reply);
    });
});

//data deleted when its advert gets deleted, ref.profileCtrl.js
router.delete('/:reply_id', function (req, res) {
    console.log(req.params.reply_id);
    Replydb.remove({
        _id: req.params.reply_id
    }, function (err, reply) {
        if (err)
            res.send(err);
        res.json({
            message: 'Successfully deleted'
        });
    });
});

//find by the advert's author
router.get('/:reply_id', function (req, res) {
    Replydb.find({
        toAd_author: req.params.reply_id
    }, function (err, replies) {
        if (err)
            res.send(err);
        res.json(replies);
        console.log('Replies by Ad Author', replies);
    });
});

router.put('/:reply_id', function (req, res) {
    Replydb.findById(req.params.reply_id, function (err, reply) {
        if (err)
            res.send(err);
        reply.author = req.body.author;
        reply.content = req.body.content;
        reply.created_at = req.body.created_at;
        reply.updated_at = req.body.updated_at;
        reply.published = req.body.published;
        reply.confirmed = req.body.confirmed;
        reply.helper = req.body.helper;

        reply.save(function (err) {
            if (err)
                res.send(err);
            res.json(reply);
            console.log('Updated:', reply);
        });
    });
});

//Update the reply,  getting the advert ref after reply validation
router.put('/approved/:reply_id', function (req, res) {
    Replydb.findById(req.params.reply_id, function (err, reply) {
        if (err)
            res.send(err);
        reply.rep_approved = true;
        reply.save(function (err) {
            if (err)
                res.send(err);
            res.json(reply);
            console.log('UpdatedRepApproved:', reply);
        });
    });
});

//retrieve by author all replies which have been approved
router.get('/approved/:user_id', function (req, res) {
    console.log('req USER : ', req.params.user_id);
    Replydb.find({
        author_id: req.params.user_id,
        rep_approved: true
    })
            .populate('toAdId')
            .exec(function (err, reply) {
                if (err)
                    res.send(err);

                res.json(reply);
                console.log('repliesApproved By author', reply);
            });
});

router.get('/searchReplies/:reply_id', function (req, res) {
//    console.log('req Type : ', req.params.reply_id);
    Replydb.find({
        toAdId: req.params.reply_id
    }, function (err, replies) {
        if (err)
            res.send(err);

        res.json(replies);
        console.log('Replies', replies);
        console.log('voila les rep aux annonces : ', req.params.reply_id);
    });
});


router.get('/replyToAd/:reply_id', function (req, res) {
    Replydb.findById(req.params.reply_id, function (err, reply) {
        if (err)
            res.send(err);
        res.json(reply);
        console.log('Edit:', reply);
    });
});

/** API path that will upload the files */
router.post('/upload', function (req, res) {
    var storage = multer.diskStorage({//multers disk storage settings
        destination: function (req, file, cb) {
            cb(null, '../public/uploads/')
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


module.exports = router;



