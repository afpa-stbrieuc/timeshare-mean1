var express = require('express'),
	router = express.Router()

router.use('/api/account', require('./accountCtrl'));
router.use('/api/users', require('./userCtrl'));
router.use('/api/adverts', require('./advertsCtrl'));
router.use('/api/replies', require('./repliesCtrl'));

router.use(express.static(__dirname + '/../../public'));


router.get('/', function(req, res) {
	res.sendFile('index.html', {
		'root': __dirname + '/../../public'
	});
})


module.exports = router