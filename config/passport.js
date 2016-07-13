var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;  // allows us to accept e-mails and verify users with e-mail
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function() {

  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({                                  // search with user attempting to login
        username: username
      }).exec(function(err, user) {                   // checks if user is authenticated with password supplied
        if (user && user.authenticate(password, user.password, function(err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            console.log('Invalid Password');
            return done(null, false, {
              message: 'Invalid Password'
            });
          }
        }));
      });
    }));


  // taken directly from passportjs npm examples
  passport.serializeUser(function(user, done) {
    if (user) {
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }).exec(function(err, user) {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });
}