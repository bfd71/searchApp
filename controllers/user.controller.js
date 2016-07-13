// holds the methods of logging in and registering a new user
var passport = require('passport');
var User = require('../models/User.model');


// method for registering a user
exports.register = function(req, res, next) {
  // Get form values
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  var newUser = new User({
    email: email,
    username: username,
    password: password,
    password2: password2
  });

  User.createUser(newUser, function(err, user) {
    if(err) throw err;
    console.log(user);
    res.status(200).end();
  });
}

// method for logging in a user
exports.login = function(req, res, next) {
	// mostly taken from passport example
	var auth = passport.authenticate('local', function(err, user) {
    if(err) {
      return next(err);
    }
    if(!user) {
      res.send({
        success: false
      })
    }
    req.logIn(user, function(err) {
      if(err) {
        return next(err);
      }
      res.send({
        success: true,
        user: user
      });
    });
  });

	// recurssively call auth defined above
	auth(req, res, next);
}