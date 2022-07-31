const Post = require("../models/post");
const User = require("../models/user");
module.exports.home = async function (req, res) {
  // console.log(req.cookies);
  // res.cookie('second_cookie', 2);
  // console.log(req.cookies['first_cookie']);

  // Post.find({}, function(err, posts){
  //     return res.render('home',{
  //         title:"Home",
  //         posts:posts
  //     });
  // })
  /////////////////////////

  // Post.find({})
  //   .populate("user")
  //   .populate({
  //     path:'comments',
  //     populate:{
  //       path:'user'
  //     }
  //   })
  //   .exec(function (err, posts) {
  //       // console.log(posts[0].user)
  //     User.find({}, function(err, users){
  //       return res.render("home", {
  //         title: "Home",
  //         posts: posts,
  //         all_users:users
  //       });
  //     });
  //   });
  ////////////////////////

  // using Async await
  let posts = await Post.find({})
    .sort('-createdAt')
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  let users = await User.find();

  return res.render("home", {
    title: "Home",
    posts: posts,
    all_users: users,
  });
};
