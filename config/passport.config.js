const passport = require("passport");
const { userRepo } = require("./db.config");
const bcrypt = require('bcryptjs');
const hashPwd = require("../utils/hashPassword");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.deserializeUser(async (email, done) => {
    const user =  await userRepo.findOneBy({email: email})
    if(!user){
        return done('Invalid', null)
    }
    done(null, user)
})
passport.serializeUser((user, done) => {
    done(null, user.email)
})

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'}, async (username, password, done) => {
        console.log(username, password);
        const user = await userRepo.findOneBy({email: username});
        console.log("User", user);
        if(!user){
            return done(null, false);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            return done(null, user);
        }
        return done(null, false)
    }))
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/google/callback',
        scope: ['email', 'profile'],
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        console.log("Profile", profile);
        const user = await userRepo.findOneBy({email: profile.email});
        if(req.query.state === 'register'){
            if(!user){
                const hashedPwd = await hashPwd('');
                const newUser = {username: profile.displayName, email: profile.email, role: 'customer', password: hashedPwd};
                await userRepo.save(newUser);
                return done(null, newUser, {message: 'Registered'})
            }
            return done(null, null, {message: "Account already registered"})
        } else{
            if(user){
                return done(null, user, {message: "Logged in"})
            }
            return done(null, null, {message: "Account didn't exist"})
        }
    }) 
    )
    
}
