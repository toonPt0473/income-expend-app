const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        if(user) done(null, user.id);
        return
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        passReqToCallback : true 
    },
    function(req, username, password, done) {
        User.findOne({ 'local.username' :  username }, function(err, user) {
            if (err)
                return done(err);

            if (user) {
                return done(null, false, req.flash('signupMessage', 'That Username is already taken.'));
            } else {
                var newUser = new User();

                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });    
    }));


    passport.use('local-login', new LocalStrategy({
        passReqToCallback : true 
    },
    function(req, username, password, done) { 
        User.findOne({ 'local.username' :  username }, function(err, user) {
            if (err)
                return done(err);
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); 
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 

            return done(null, user);
        });
    }));
};


