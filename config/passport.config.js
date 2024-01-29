const passport = require("passport");
const { userRepo } = require("./db.config");
const bcrypt = require('bcryptjs');
const { hashPwd } = require("../utils/hashPassword");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.deserializeUser(async (user, done) => {
    const retrievedUser = await userRepo.findOneBy({ email: user.email });
    if (!user) {
        return done('Not a existed user', null)
    }
    done(null, user)
})
passport.serializeUser((user, done) => {
    console.log("User in serialize");
    done(null, { id: user.id, username: user.username, email: user.email, role: user.role, avatar: user.avatar })
})

module.exports = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (username, password, done) => {
        console.log(username, password);
        const user = await userRepo.findOneBy({ email: username });
        console.log("User", user);
        if (!user) {
            return done(null, false, 'Account is not exist');
        }
        let isMatch = false;
        if (user.locked || user.deleted) {
            isMatch = false;
            return done(null, false, 'Account have been locked');
        } else {
            isMatch = await bcrypt.compare(password, user.password);
        }
        if (isMatch) {
            return done(null, user);
        }
        return done(null, false, 'Incorrect password');
    }))
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://localhost:3000/google/callback',
        scope: ['email', 'profile'],
        passReqToCallback: true
    }, async (req, accessToken, refreshToken, profile, done) => {
        console.log("Profile", profile);
        const user = await userRepo.findOneBy({ email: profile.email });
        if (req.query.state === 'register') {
            if (!user) {
                const hashedPwd = await hashPwd('');
                const newUser = { username: profile.displayName, email: profile.email, role: 'customer', password: hashedPwd };
                await userRepo.save(newUser);
                return done(null, newUser, { message: 'Registered' })
            }
            return done(null, null, { message: "Account already registered" })
        }
        //login
        if (user?.locked === false && user?.deleted === false) {
            return done(null, user, { message: "Logged in" })
        }
        return done(null, null, { message: "Account didn't exist" })
    })
    )


}
