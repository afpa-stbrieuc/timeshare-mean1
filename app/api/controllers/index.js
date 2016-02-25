var express = require('express'),
	router = express.Router(),
        jwt = require('express-jwt'),
        auth = jwt({
            secret: process.env.JWT_SECRET,
    userProperty:'payload'
        });

router.use('/api/account', require('./accountCtrl'));
router.use('/api/back', require('./backOfficeCtrl'));
router.use('/api/users', require('./userCtrl'));
router.use('/api/adverts', require('./advertsCtrl'));
router.use('/api/replies', require('./repliesCtrl'));
router.use('/api/upload', require('./uploadCtrl'));
router.use('/api/email', require('./emailCtrl'));

router.use(express.static(__dirname + '/../../public'));


router.get('/', function(req, res) {
	res.sendFile('index.html', {
		'root': __dirname + '/../../public'
	});
});


module.exports = router