const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passReqToCallback: true
    },
    function (req, email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log("Error in finding user --> passport");
          return done(err);
        }
        if (!user || password != user.password) {
          req.flash('error', "Invalid username/password");
          console.log("Invalid username/password");
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user --> passport");
      return done(err);
    }
    return done(null, user);
  });
});

passport.check_authentication = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else{
    return res.redirect('/users/sign-in');
  }
}

passport.set_authenticated_user = function(req, res, next){
  if(req.isAuthenticated()){
    res.locals.user = req.user;
  }
  next();
}


module.exports = passport;