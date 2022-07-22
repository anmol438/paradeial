const User = require("../models/user");
const passport = require("passport");

module.exports.profile = function (req, res) {
  // console.log('******',req.user);
  res.render("user_profile", {
    title: "Profile",
  });
};

module.exports.sign_in = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

module.exports.sign_up = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

module.exports.create = function (req, res) {
  console.log("signing up...");
  if (req.body.password != req.body.confirm_password) {
    console.log("Password is not same");
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding email while signing up");
      return;
    }

    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating user while signing up");
          return;
        }
        console.log("***** user created", user);
        return res.redirect("/users/sign-in");
      });
    } else {
      console.log("User already exist");
      return res.redirect("back");
    }
  });
};

module.exports.create_session = function (req, res) {
  return res.redirect("/users/profile");
};
