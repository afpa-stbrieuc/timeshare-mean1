require('dotenv').load();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var path = require('path');

var mongoose    = require('mongoose');
var config = require('./config');
app.set('superSecret', config.secret);


app.use(function(err, req, res, next){
	if(err.name === 'UnauthorizedError'){
		res.status(401);
		res.json({"message" : err.name + ": " + err.message});
	}
});

// configure body parser so we can get http body data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var passport = require('passport');
app.use(require('./controllers'));
require('./config/passport');
app.use(passport.initialize());


var server;



app.boot = function(config){


	mongoose.connect(config.db.mongodb); // connect to our database

	server = app.listen(port, function() {
  		console.log('Listening on port ' + port)
	})
}

app.shutdown = function() {
	console.log('Shutdown server on port ' + port)
	server.close();
}

//if launched via command line or used as a module (e.g tests) @see http://stackoverflow.com/questions/8864365/can-i-know-in-node-js-if-my-script-is-being-run-directly-or-being-loaded-by-an
if (require.main === module) {
	app.boot(require('./config'));
}
else {
	console.info('Running app as a module')

	module.exports = app;
}
