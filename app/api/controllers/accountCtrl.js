var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Accountdb = require('../models/account');


router.get('/', function (req, res) {


    Accountdb.find(function (err, account) {
        if (err)
            res.send(err);

        res.json(account);



    });
});

//add account

router.post('/', function (req, res) {

    console.log(req.body);

    var account = new Accountdb(); // create a new instance of the Account model
//    console.log('PARAMS Acc_ID', account._id );
//    account.user_Id = req.params.user_Id; // set the Account userid (comes from the request)
////    account.solde = req.body.solde;
////    account.adverts_Id = req.body.adverts_Id;
//console.log('PARAMS USER_ID', account.user_Id );

    account.save(function (err) {
        if (err)
            res.send(err);

        res.json(201, account);

    });


});

// get the Account thanks to its id
router.get('/:account_id', function (req, res) {
    Accountdb.findById(req.params.account_id, function (err, account) {
        if (err)
            res.send(err);
        res.json(201, account);
    });
});

router.get('/accountUser/:user_id', function(req, res) {
    console.log('req Type : ', req.params.user_id);
    Accountdb.findOne({
        user_Id: req.params.user_id
    }, function(err, account) {
        if (err)
            res.send(err);

        res.json(account);
        console.log('Adverts By authorID GET:', account);
    });
});

router.put('/accountUser/:user_id', function (req, res) {
    if (req.params.user_id === undefined)
        return res.send(400, 'cannot find account user');
    Accountdb.findOne({
        user_Id: req.params.user_id
    }, function (err, account) {

        if (err)
            res.send(err);
        account.solde = req.body.solde;
        account.starRating = req.body.starRating;
        account.save(function (err) {
            if (err)
                res.send(err);

            res.json(account);
        });
    });
});

// update the account with this id
//router.put('/:account_id', function (req, res) {
//    if (req.params.account_id === undefined)
//        return res.send(400, 'account id empty');
//    Accountdb.findById(req.params.account_id, function (err, account) {
//
//        if (err)
//            res.send(err);
//
//        account.userid = req.body.userid; // set the Account userid (comes from the request)
//        account.solde = req.body.solde;
//        account.advertsid = req.body.advertsid;
//
//
//        account.name = req.body.name;
//
//        account.save(function (err) {
//            if (err)
//                res.send(err);
//
//            res.json(account);
//        });
//    });
//});

// delete the Todo with this id
router.delete('/:account_id', function (req, res) {

    Accountdb.remove({
        _id: req.params.account_id
    }, function (err, account) {
        if (err)
            res.send(err);

        res.json({
            message: 'Successfully deleted'
        });
    });

});


module.exports = router