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
        reply.rep_approved = req.body.rep_approved;
//        reply.ad_cancelled = req.body.ad.cancelled;
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

//Update the reply,  getting the advert ref after ad cancellation
router.put('/cancelled/:reply_id', function (req, res) {
    console.log('req REP ID : ', req.params.reply_id);
    Replydb.findById(req.params.reply_id, function (err, reply) {
        if (err)
            res.send(err);
        reply.ad_cancelled = true;
        reply.save(function (err) {
            if (err)
                res.send(err);
            res.json(reply);
            console.log('Updated Ad-cancelled:', reply);
        });
    });
});
//retrieve by author all replies which have been approved
router.get('/approved/:user_id', function (req, res) {
    console.log('req USER : ', req.params.user_id);
    Replydb.find({
        author_id: req.params.user_id,
        rep_approved: true,
        ad_cancelled : false
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

//retrieve by author all replies which have been approved
router.get('/cancelled/:user_id', function (req, res) {
    console.log('req USER : ', req.params.user_id);
    Replydb.find({
        author_id: req.params.user_id,
        ad_cancelled: true
    })
            .populate('toAdId')
            .exec(function (err, reply) {
                if (err)
                    res.send(err);

                res.json(reply);
                console.log('Annonce annulée/rep annulée aussi:', reply);
            });
});

//
//router.get('/service/:ad_id', function (req, res) {
//    console.log('req adId : ', req.params.user_id);
//    Replydb.findOne({
//        toAdId: req.params.ad_id,
//        ad_cancelled: false,
//        rep_approved: true
//    })
//            .populate('toAdId')
//            .exec(function (err, reply) {
//                if (err)
//                    res.send(err);
//
//                res.json(reply);
//                console.log('repliesApproved By author', reply);
//            });
//});

module.exports = router;



