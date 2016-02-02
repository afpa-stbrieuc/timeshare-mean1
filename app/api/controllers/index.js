var express = require('express'),
	router = express.Router()

router.use('/api/account', require('./accountCtrl'));
router.use('/api/users', require('./userCtrl'));
router.use('/api/adverts', require('./advertsCtrl'));

<<<<<<< HEAD
router.use(express.static(__dirname + '/../../public'));
=======
router.use('/api/todos', require('./todos'))
<<<<<<< HEAD
router.use('/', require('./accountCtrl'))
=======
>>>>>>> 95eb02c00c442c022011051243a7decfd33f06bf

router.use('/api/adverts', require('./advertsCtrl'));
router.use('/api/users', require('./userCtrl'));

>>>>>>> origin
router.get('/', function(req, res) {
	res.sendFile('index.html', {
		'root': __dirname + '/../../public'
	});
})


module.exports = router