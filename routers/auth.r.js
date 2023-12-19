const express = require("express");
const router = express.Router();
const authController = require('../controller/auth.c');
const passport = require("passport");

router.route('/register')
    .get(authController.renderRegister)
    .post(authController.register);
router.route('/login')
    .get(authController.renderLogin)
    .post( passport.authenticate('local', {failureRedirect: '/register'}),(req, res) => {
        res.redirect('/')
    });
router.get('/google/login', passport.authenticate('google', {
    scope: ['email', 'profile'],
    state: 'login'
}), (req, res) => {
    console.log("Passing");
})
router.get('/google/register', passport.authenticate('google', {
    scope: ['email', 'profile'],
    state: 'register'
}))
router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', {}, (err, user, info) =>  {
        const msg = info?.message;
        if(msg === 'Logged in'){
            console.log("User" , user);
            res.redirect('/')
        } else if (msg === 'Account already registered'){
            res.locals.message = msg
            res.render('register')
        } else if(msg === 'Account did not exist'){
            res.locals.message = msg
            res.render('login')
        } else{
            res.locals.message = msg
            res.redirect('/login')
        }
    })(req, res, next);
})



module.exports = router