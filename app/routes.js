// app/routes.js
var User = require('./models/user.js');
var Bet = require('./models/bet.js');

module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect : '/profile',
          failureRedirect : '/'
      }));


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});


	// =====================================
	// CREDIT CARD ==============================
	// =====================================
	// app.post('/creditCard', function(req, res) {
	// 	console.log(Object.keys(req.body));
	// 	console.log('This is the user' + req.user);
	// 	res.redirect('/');
	// });
	// app.get('/creditCard', isLoggedIn, function(req, res) {
	// 	res.render('creditCard.ejs');
	// 	console.log('This is the user' + req.user);
	// });


//////////////////////// GREENWALD ROUTES //////////////////////////////////////
app.get('/currentBets', isLoggedIn, function(req, res) {

	User.findOne({
	'_id': req.user.id
	})
		.populate('currentBets.bet')
		.exec(function(error, user) {
			var bets = [];
			var betIds = [];

			for (var j = 0; j < user.currentBets.length; j++) {
				var currentBet = user.currentBets[j];
				betIds.push(currentBet.bet.id);
			}

			Bet.find({
				'_id': { $nin: betIds}
			}, function(err, unseenBets) {
				// res.json(unseenBets).end();
				res.render('bets.ejs', { unseenBets : unseenBets });
			});
		});
});

// WHEN A USER ADDS A BET, pass the bet object in as a json
// if you have the betID that represenents a bet then you can say:
// curl -H "Content-Type: application/json" -X POST -d '{"betId":"57001f65944baac657bcc109"}' http://localhost:8080/currentBets
app.post('/currentBets', isLoggedIn, function(req, res) {
	User.find({}, function(err, users) {
		// Add the new rating to the database
			var newBet = {chosenTeam: req.body.chosenTeam, bet: req.body.betId};
			User.update(
					{ '_id': req.user.id,
					'currentBets.bet' : {$ne: req.body.betId}}, //makes sure not to add duplicates
					{$push: {currentBets: newBet}},
					function(err, user) {
						if (!err) {
							console.log("This is the user " + user);
							res.sendStatus(200).end();
						} else {
							// Internal server error
							console.log("this is the error " + err);
							res.sendStatus(500).end();
						}
					}
			);
	});
});






};

// route middleware to make sure
function isLoggedIn(req, res, next) {
	// console.log(req.isAuthenticated());

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}
