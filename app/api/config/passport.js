var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'mail'
      /* We have password so that one’s okay, but instead of username we’re using email. Passport
allows you to override the username*/
  },
  function(username, password, done) {
    User.findOne({
      mail: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Incorrect username.'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      return done(null, user);
    });
  }
));