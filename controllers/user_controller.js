module.exports.profile = function(req, res){
    res.render('user_profile', {
        title:"Profile"
    });
}

module.exports.sign_in = function(req, res){
    res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
};

module.exports.sign_up = function(req, res){
    res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
};