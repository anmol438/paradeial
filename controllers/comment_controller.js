const Comment = require('../models/comment');
const Post = require('../models/post');
const mongoose = require('mongoose');

module.exports.create = function(req, res){
    Post.findById( req.body.post, function(err, post){
        if(err){
            console.log("Error in finding the post while commenting", err);
            return;
        }
        Comment.create({
            content:req.body.content,
            user:req.user._id,
            post:post._id
        },function(err, comment){
            if(err){
                console.log("Error in adding the comment", err);
                return;
            }
            post.comments.push(comment);
            post.save();
    
            return res.redirect('/');
        });
    });
    
}

module.exports.destroy = function(req, res){
    Comment.findById(req.params.id, function(err, comment){
        if(err){
            console.log("Error in fnding comment while deleting");
            return;
        }

        if(req.user.id == comment.user){
            Post.findByIdAndUpdate(comment.post, {$pull:{comments:comment._id}}, function(err, post){});
            comment.remove();
            return res.redirect('back');
        }else{
            console.log("not authorised");
            return res.redirect('back');
        }
    })
}