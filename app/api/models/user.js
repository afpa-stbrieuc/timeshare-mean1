var mongoose     = require('mongoose');
var validator = require('node-mongoose-validator');
var Schema       = mongoose.Schema;

var userSchema   = new Schema({
lastname: {type: String, maxlength: 50},
firstname: {type: String, maxlength: 50},
adress:{type: String, maxlength: 120},
mail: {type: String, required : true,  maxlength: 50, index: { unique: true }},
tel: {type: String, maxlength: 10},
verified: {type: Boolean, default : false },
password: { type: String, required: true }
},
{
	collection : "user"
}

);



userSchema.path('lastname').validate(validator.notEmpty(), 'Please provide a lastname.');
userSchema.path('firstname').validate(validator.notEmpty(), 'Please provide a firstname.');
userSchema.path('lastname').validate(validator.isLength({min:3, max: undefined}), 'Lastname must be at least 3 characters.');
userSchema.path('firstname').validate(validator.isLength({min:3, max: undefined}), 'Firstname must be at least 3 characters.');
userSchema.path('mail').validate(validator.isEmail(), 'Please provide a valid email address example@example.com');
userSchema.path('password').validate(validator.isLength({min:7, max: undefined}), 'Password must be at least 7 characters.');



module.exports = mongoose.model('userSchema', userSchema);