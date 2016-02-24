var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var validator = require('node-mongoose-validator');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    lastname: {
      type: String,
      maxlength: 50
    },
    firstname: {
      type: String,
      maxlength: 50
    },
    adress: {
      type: String,
      maxlength: 120
    },
    mail: {
      type: String,
      required: true,
      maxlength: 50,
      index: {
        unique: true
      }
    },
    tel: {
      type: String,
      maxlength: 10
    },
    verified: {
      type: Boolean,
      default: false
    },
    hash: String,
    salt: String,
    admin: {
      type: Boolean,
      default: false
    },
    account_Id: {
      type: Schema.Types.ObjectId, ref: 'accountSchema'
    },
    media: String
  }, {
    collection: "user"
  }

);

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    mail: this.mail,
    lastname: this.lastname,
    firstname: this.firstname,
    tel: this.tel,
    adress: this.adress,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

userSchema.path('lastname').validate(validator.notEmpty(), 'Please provide a lastname.');
userSchema.path('firstname').validate(validator.notEmpty(), 'Please provide a firstname.');
userSchema.path('lastname').validate(validator.isLength({
  min: 3,
  max: undefined
}), 'Lastname must be at least 3 characters.');
userSchema.path('firstname').validate(validator.isLength({
  min: 3,
  max: undefined
}), 'Firstname must be at least 3 characters.');
userSchema.path('mail').validate(validator.isEmail(), 'Please provide a valid email address example@example.com');



module.exports = mongoose.model('user', userSchema);