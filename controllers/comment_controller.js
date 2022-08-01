const Comment = require("../models/comment");
const Post = require("../models/post");
const mongoose = require("mongoose");

module.exports.create = async function (req, res) {
  // Post.findById( req.body.post, function(err, post){
  //     if(err){
  //         console.log("Error in finding the post while commenting", err);
  //         return;
  //     }
  //     Comment.create({
  //         content:req.body.content,
  //         user:req.user._id,
  //         post:post._id
  //     },function(err, comment){
  //         if(err){
  //             console.log("Error in adding the comment", err);
  //             return;
  //         }
  //         post.comments.push(comment);
  //         post.save();

  //         return res.redirect('/');
  //     });
  // });

  /////////////////////////

  try {
    let post = await Post.findById(req.body.post);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        user: req.user._id,
        post: post._id,
      });

      post.comments.unshift(comment);
      post.save();

      if(req.xhr){
        return res.status(200).json({
          data:{
            comment:comment,
            comment_user:req.user.name
          },
          message:"Comment Added"
        });
      }

      req.flash('success', 'Comment added');
      return res.redirect("/");
    }

    
  } catch (err) {
    console.log("Error --->  ", err);
    return;
  }
};

module.exports.destroy = async function (req, res) {
  //   Comment.findById(req.params.id, function (err, comment) {
  //     if (err) {
  //       console.log("Error in fnding comment while deleting");
  //       return;
  //     }

  //     if (req.user.id == comment.user) {
  //       Post.findByIdAndUpdate(
  //         comment.post,
  //         { $pull: { comments: comment._id } },
  //         function (err, post) {}
  //       );
  //       comment.remove();
  //       return res.redirect("back");
  //     } else {
  //       console.log("not authorised");
  //       return res.redirect("back");
  //     }
  //   });

  //////////////////////////
  try {
    let comment = await Comment.findById(req.params.id);

    if (req.user.id == comment.user) {
      await Post.findByIdAndUpdate(comment.post, {
        $pull: { comments: comment._id },
      });
      comment.remove();

      if(req.xhr){
        return res.status(200).json({
          data:{
            comment_id:req.params.id,
          },
          message:"Comment Deleted"
        });
      }

      req.flash('success', "Comment deleted");
    } else {
      console.log("Not authorized");
    }
    return res.redirect("back");
  } catch (err) {
    console.log("Error --->  ", err);
  }
};
