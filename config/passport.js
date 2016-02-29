// config/passport.js

// load all the things we need
var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

// load up the user model
var User       		= require('../app/models/user');
var Company       = require('../app/models/company');

// load the auth variables
var configAuth = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {

	// =========================================================================
  //   passport session setup ==================================================
  //   =========================================================================
  //   required for persistent login sessions
  //   passport needs ability to serialize and unserialize users out of session
  //
  //   // used to serialize the user for the session
    passport.serializeUser(function(userOrCompany, done) {
        done(null, userOrCompany.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, userOrCompany) {
            if (userOrCompany || err) {
              done(err, userOrCompany);
            } else {
              Company.findById(id, function(err, userOrCompany) {
                done(err, userOrCompany);
              });
            }
        });
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
      console.log('These are the keys in the request body ' + Object.keys(req.body));

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        Company.findOne({ 'local.email' :  email }, function(err, company) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (company) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

				// if there is no user with that email
                // create the user
                var newCompany         = new Company();

                // set the user's local credentials
                newCompany.local.email    = email;
                newCompany.local.password = newCompany.generateHash(password); // use the generateHash function in our user model

				// save the user
                newCompany.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newCompany);
                });
            }

        });

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        Company.findOne({ 'local.email' :  email }, function(err, company) {
            // if there are any errors, return the error before anything else

            if (err)
                return done(err);

            // if no user is found, return the message
            if (!company)
                return done(null, false, req.flash('loginMessage', 'No company found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!company.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, company);
        });

    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        // pull in our app id and secret from our auth.js file
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields   : ["emails", "displayName"]

    },

    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // find the user in the database based on their facebook id
            User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if there is no user found with that facebook id, create them
                    var newUser            = new User();

                    // set all of the facebook information in our user model
                    newUser.facebook.id    = profile.id; // set the users facebook id
                    newUser.facebook.token = token; // we will save the token that facebook provides to the user
                    newUser.facebook.name = profile.displayName;// look at the passport user profile to see how names are returned
                    newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

                    // save our user to the database
                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, newUser);
                    });
                }

            });
        });

    }));
};
