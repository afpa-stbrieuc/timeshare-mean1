var express = require('express')
  , router = express.Router()

router.use(express.static(__dirname + '/../../public'))

router.use('/api/todos', require('./todos'))

router.use('/api/adverts', require('./advertsCtrl'));
router.use('/api/users', require('./userCtrl'));
//router.get('/home', function(req, res) {
//  res.send('Home page')
//})

router.get('/', function(req, res) {
  res.sendFile('index.html', {'root':__dirname + '/../../public'});
})


router.get('/about', function(req, res) {
  res.send('Learn about us')
})

module.exports = router