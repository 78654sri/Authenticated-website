exports.renderHomePage = function(req,res){
    return res.render('home', {
        user: req.user,
    });
};

exports.renderLoginPage = function(req,res){
    if(req.user) return res.redirect('/');
    return res.render('login');
}

exports.renderSignUpPage = function(req,res){
    if(req.user) return res.redirect('/');
    return res.render('signup');
}