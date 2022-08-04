const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function (req, res) {


    let posts = await Post.find({})
        .sort('-createdAt')
        .populate("user")
        .populate({
            path: "comments",
            populate: {
                path: "user",
            },
        });


    return res.status(200).json({
        message: "Post List",
        posts: posts
    });
};


module.exports.destroy = async function (req, res) {

    try {
        let post = await Post.findById(req.params.id);
        if(req.user.id == post.user){
            await Comment.deleteMany({ _id: post.comments });
            post.remove();
            return res.status(200).json({
                message:"Post and its comments deleted",
            })
        }else{
            console.log('not authorised');
            return res.status(401).json({
                message:"Not authorised to delete the post"
            })
        }
    } catch (err) {
        console.log("Error --->  ", err);
        return res.status(500).json({
            message: "Internal Server Error"
        });

    }

};