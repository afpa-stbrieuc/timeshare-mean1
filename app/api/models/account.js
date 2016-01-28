var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//var NodeValidator = require('pure-validator-node');
//var validator = require('pure-validator');
//var nodeValidator = new NodeValidator(validator);

var AccountSchema   = new Schema({
	userid: String,
	solde: String,
	//	validate:{
	//		pure-validator-node : isTypString,
	//		message : 'Erreur'
	//	}
	advertsid: String,
	created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
},
{
	collection: 'account'
});

module.exports = mongoose.model('account', AccountSchema);