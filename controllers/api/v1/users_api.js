const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.create_session = async function(req, res){

    try {
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message:"Invalid Username/Password"
            });
        }

        return res.status(200).json({
            message: "Sign in successfull and token generated",
            data:{
                token: jwt.sign(user.toJSON(), 'paradia', {expiresIn: 1000*60*60*24*30})
            }
        })

    } catch (error) {
        console.log("Error ---> ", error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};