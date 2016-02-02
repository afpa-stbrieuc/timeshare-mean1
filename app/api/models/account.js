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

