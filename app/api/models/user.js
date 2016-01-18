var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
lastname: {type: String, maxlength: 50},
firstname: {type: String, maxlength: 50},
adress:{type: String, maxlength: 120},
mail: {type: String, maxlength: 50},
tel: {type: String, maxlength: 10}
},
{
	collection : "user"
}

);




module.exports = mongoose.model('timedb', userSchema);