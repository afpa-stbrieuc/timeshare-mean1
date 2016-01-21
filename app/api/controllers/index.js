var path = require('path')
var express = require('express')
  , router = express.Router()
//router.use(express.static(__dirname + '/../public'))

//console.log(path.dirname(path.dirname(module.parent.filename))+'/public');
//'C:/wamp/www/timeshare-mean1/timeshare-mean1/app/public'
router.use(express.static(path.dirname(path.dirname(module.parent.filename))+'/public'))

router.use('/api/todos', require('./todos'))

router.use('/api/account', require('./accountCtrl'))

router.use('/api/adverts', require('./advertsCtrl'));

//router.get('/', function(req, res) {


  //res.send('Home page')
  //res.render('index');
//})

router.get('/about', function(req, res) {
  res.send('Learn about us')
})

module.exports = router