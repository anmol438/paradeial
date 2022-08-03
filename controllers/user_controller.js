const User = require("../models/user");
const passport = require("passport");

module.exports.profile = function (req, res) {
  // console.log('******',req.user);
  let user_id = req.query.user_id;

  User.findById(user_id, function (err, user) {
    res.render("user_profile", {
      title: "Profile",
      profile_user: user,
    });
  });
};

module.exports.update = async function (req, res) {
  // if (req.user.id == req.query.user_id) {
  //   User.findByIdAndUpdate(req.query.user_id, req.body, function (err, user) {
  //     if (err) {
  //       console.log("Error in updating profile");
  //       return;
  //     }
  //     console.log("Profile Updated");
  //     req.flash('success', 'Profile updated!')
  //     return res.redirect("back");
  //   });
  // } else {
  //   return res.status(401).send("Unathorized Access");
  // }


  if (req.user.id == req.query.user_id) {
    try {
      let user = await User.findById(req.query.user_id);
      // if(user){
        User.uploaded_avatar(req, res, function(err){
          if(err){
            console.log(" Multer Error ---> ", err);
          }

          user.name = req.body.name;
          user.email = req.body.email;

          if(req.file){
            user.avatar = User.avatar_path + '/' + req.file.filename;
          }

          user.save();
          return res.redirect("back");

        });
      // }
    } catch (error) {
      req.flash('error', err);
      return  res.redirect('back');
    }
  } else {
    return res.status(401).send("Unathorized Access");
  }


};

module.exports.sign_in = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
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

module.exports.create = async function (req, res) {
  console.log("signing up...");
  if (req.body.password != req.body.confirm_password) {
    console.log("Password is not same");
    req.flash('error', 'Password does not match!');
    return res.redirect("back");
  }

  // User.findOne({ email: req.body.email }, function (err, user) {
  //   if (err) {
  //     console.log("Error in finding email while signing up");
  //     return;
  //   }

  //   if (!user) {
  //     User.create(req.body, function (err, user) {
  //       if (err) {
  //         console.log("Error in creating user while signing up");
  //         return;
  //       }
  //       console.log("***** user created", user);
  //       return res.redirect("/users/sign-in");
  //     });
  //   } else {
  //     console.log("User already exist");
  //     return res.redirect("back");
  //   }
  // });

  ////////////////////
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      user = await User.create(req.body);
      req.flash('success', 'Sign Up successfull');
      console.log("***** user created", user);
      return res.redirect("/users/sign-in");
    } else {
      req.flash('error', "Username already taken");
      console.log("User already exist");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash('error', err);
    console.log("Error --->  ", err);
  }
};

module.exports.create_session = function (req, res) {
  req.flash("success", "Logged in successfullly");
  return res.redirect("/");
};

module.exports.destroy_session = function (req, res) {
  console.log("logging out...");
  req.logout(function (err) {
    if (err) {
      console.log("Error in logging out");
      return;
    }
    console.log("logged out");
    
  });
  req.flash("success", "You have logged out!");

  return res.redirect("/");
};
