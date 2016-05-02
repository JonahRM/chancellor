// app/routes.js
var User = require('./models/user.js');
var Bet = require('./models/bet.js');

module.exports = function(app, passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/api/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/api/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/api/login', passport.authenticate('local-login', {
		successRedirect : '/api/profile', // redirect to the secure profile section
		failureRedirect : '/api/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/api/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/api/signup', passport.authenticate('local-signup', {
		successRedirect : '/api/profile', // redirect to the secure profile section
		failureRedirect : '/api/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/api/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  app.get('/api/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // handle the callback after facebook has authenticated the user
  app.get('/api/auth/facebook/callback',
      passport.authenticate('facebook', {
          successRedirect : '/api/profile',
          failureRedirect : '/api/'
      }));


	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/api/logout', function(req, res) {
		req.logout();
		res.redirect('/api/');
	});


	// =====================================
	// CREDIT CARD ==============================
	// =====================================
	// app.post('/api/creditCard', function(req, res) {
	// 	console.log(Object.keys(req.body));
	// 	console.log('This is the user' + req.user);
	// 	res.redirect('/');
	// });
	// app.get('/api/creditCard', isLoggedIn, function(req, res) {
	// 	res.render('creditCard.ejs');
	// 	console.log('This is the user' + req.user);
	// });


//////////////////////// GREENWALD ROUTES //////////////////////////////////////
app.get('/api/userAvailableBets', isLoggedIn, function(req, res) {

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
				res.json(unseenBets).end();
				// res.render('bets.ejs', { unseenBets : unseenBets });
			});
		});
});

app.get('/api/profileJSON', isLoggedIn, function(req, res) {

			res.json({user : req.user }).end();
				// res.render('bets.ejs', { unseenBets : unseenBets });

});

// WHEN A USER ADDS A BET, pass the bet object in as a json
// if you have the betID that represenents a bet then you can say:
// curl -H "Content-Type: application/json" -X POST -d '{"betId":"57001f65944baac657bcc109"}' http://localhost:8080/currentBets
app.post('/api/userTakenBets/add', isLoggedIn, function(req, res) {
	User.find({}, function(err, users) {
		// Add the new rating to the database
			var newBet = {userChosenTeam: req.body.userChosenTeam, bet: req.body.betId};
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

app.post('/api/userTakenBets/cancel', isLoggedIn, function(req, res) {
	User.update (
    {'_id': req.user.id },
    { $pull: { "currentBets" : { bet: req.body.betId  } } },
		function(err, numAffected) {
			if (!err) {
				console.log("this is the numAffected: " + JSON.stringify(numAffected, null, '\t'));
				res.sendStatus(200).end();
			}
		}
	);
});

app.get('/api/userTakenBets', isLoggedIn, function(req, res) {
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
				'_id': { $in: betIds}
			}, function(err, seenBets) {
				res.json(seenBets).end();
				// res.render('bets.ejs', { unseenBets : seenBets });
			});
		});
});

app.get('/api/addNewBet', function(req, res) {
res.render('addBet');
});

app.post('/api/addNewBet', function(req, res) {
console.log(JSON.stringify(req.body, null, '\t'));
var newBet = new Bet({
	teamOne: req.body.teamOne,
	photoOneURL: req.body.photoOneURL,
	teamTwo: req.body.teamTwo,
	photoTwoURL: req.body.photoTwoURL,
	vendor: req.body.vendor,
	vendorPhoto: req.body.vendorPhoto,
	odds: req.body.odds,
	percentage: req.body.percentage,
	product: req.body.product
});
newBet.save(function(err, nb) {
console.log("This is the new bet: " + nb);
res.json(nb);
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
	res.redirect('/api/');
}
