var express = require('express'),
	router = express.Router()

<<<<<<< HEAD
router.use(express.static(__dirname + '/../../public'))
=======
router.use('/api/account', require('./accountCtrl'));
router.use('/api/users', require('./userCtrl'));
router.use('/api/adverts', require('./advertsCtrl'));
>>>>>>> 135b185a022da516d0fea0f51211b249b99f1ac4

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
<<<<<<< HEAD
//router.get('/home', function(req, res) {
//  res.send('Home page')
//})
=======
>>>>>>> 135b185a022da516d0fea0f51211b249b99f1ac4

>>>>>>> origin
router.get('/', function(req, res) {
<<<<<<< HEAD
  res.sendFile('index.html', {'root':__dirname + '/../../public'});
})


router.get('/about', function(req, res) {
  res.send('Learn about us')
})
=======
	res.sendFile('index.html', {
		'root': __dirname + '/../../public'
	});
})

>>>>>>> 135b185a022da516d0fea0f51211b249b99f1ac4

module.exports = router