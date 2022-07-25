const Comment = require('../models/comment');
const Post = require('../models/post');
const mongoose = require('mongoose');

module.exports.create = function(req, res){
    console.log('***'+(req.body.post)+'***')
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
            console.log("comment added --> ", comment);
    
            return res.redirect('/');
        });
    });
    
}