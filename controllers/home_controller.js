module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('second_cookie', 2);
    // console.log(req.cookies['first_cookie']);
    return res.render('home',{
        title:"Home"
    });
}