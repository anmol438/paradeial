const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = function(req,res){
    console.log('creating a post...');

    Post.create({
        content: req.body.content,
        user:req.user._id
    }, function(err, post){
        if(err){
            console.log("Error in creating the post.");
            return;
        }
        console.log("Post created -->", post);
        return res.redirect('back');
    })
}

module.exports.destroy = async function(req, res){
    // Post.findById(req.params.id, function(err, post){

    //     if(err){
    //         console.log("Cannot find post while deleting");
    //         return;
    //     }

    //     if(req.user.id == post.user){
    //         Comment.deleteMany({_id:post.comments}, function(err){});
    //         post.remove();
    //         return res.redirect('back');
    //     }else{
    //         console.log('not authorised');
    //         return res.redirect('back');
    //     }

    // });

    ////////////////////////
    try{
        let post = await Post.findById(req.params.id);

        if(req.user.id = post.user){
            await Comment.deleteMany({_id:post.comments});
            post.remove();
            return res.redirect('back');
        }else{
            console.log('not authorised');
            return res.redirect('back');
        }
    }catch(err){
        console.log("Error --->  ", err);
    }
    
}