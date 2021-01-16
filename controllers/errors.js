module.exports = (req,res, next)=>{
    res.render('404.ejs',{
        isAuthenticated: req.session.isAuthenticated,
        user: req.session.user
    });
}