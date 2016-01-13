var express = require('express')
  , router = express.Router()

router.use(express.static(__dirname + '/../public'))

router.use('/api/todos', require('./todos'))
router.use('/', require('./accountCtrl'))
router.get('/', function(req, res) {
  res.send('Home page')
})

router.get('/about', function(req, res) {
  res.send('Learn about us')
})

module.exports = router