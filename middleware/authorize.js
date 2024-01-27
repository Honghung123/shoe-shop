const authorize = (role) => {
    return (req, res, next) => {
        console.log("Is authenticated", req.isAuthenticated());
        if(req.isAuthenticated() && req.user.role === role){
            return next();
        }
        res.redirect('/')
    }
}
module.exports = authorize