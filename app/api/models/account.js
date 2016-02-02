<<<<<<< HEAD
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var NodeValidator = require('pure-validator-node');
//var validator = require('pure-validator');
//var nodeValidator = new NodeValidator(validator);

var AccountSchema = new Schema({
	userid: String,
	solde: String,
	//	validate:{
	//		pure-validator-node : isTypString,
	//		message : 'Erreur'
	//	}
	advertsid: String,
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
}, {
	collection: 'account'
});

module.exports = mongoose.model('account', AccountSchema);
=======
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var AccountSchema   = new Schema({
	userid: String,
	solde: String,
	advertsid: String,
	created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
},
{
	collection: 'account'
});

module.exports = mongoose.model('Account', AccountSchema);
>>>>>>> 95eb02c00c442c022011051243a7decfd33f06bf
