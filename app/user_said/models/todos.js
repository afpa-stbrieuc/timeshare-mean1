var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TodoSchema   = new Schema({
	name: String
});

module.exports = mongoose.model('Todos', TodoSchema);