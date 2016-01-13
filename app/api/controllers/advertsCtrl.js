var express = require('express');
var router = express.Router();

var Advertdb = require('../models/adverts');

router.get('/', function(req, res) {
    console.log("data received by GET request");
	Advertdb.find(function(err, adverts) {
		if (err)
			res.send(err);

		res.json(adverts);
                console.log('GET:',adverts);
	});
});


router.post('/', function(req, res) {

        console.log(req.body);

	var advert = new Advertdb(); // create a new instance of the Advert model
	        advert.type = req.body.type; 
		advert.author = req.body.author;
                advert.content = req.body.content; 
                advert.media = req.body.media;
                advert.loc = req.body.loc; 
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
                console.log('Saved:',advert);
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
                        console.log('Edit:',advert);
		});

});

router.put('/:advert_id', function(req, res) {

	Advertdb.findById(req.params.advert_id, function(err, advert) {

		if (err)
			res.send(err);
                advert.type = req.body.type; 
		advert.author = req.body.author;
                advert.content = req.body.content; 
                advert.media = req.body.media;
                advert.loc = req.body.loc; 
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
                        console.log('Updated:',advert);
		});

	});	
});


module.exports = router