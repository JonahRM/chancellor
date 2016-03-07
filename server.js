// server.js

// https://scotch.io/tutorials/easy-node-authentication-linking-all-accounts-together

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

var Event       = require('./app/models/event');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

var CronJob = require('cron').CronJob;

new CronJob('*/10 * * * *', function() {
var request = require("request");
var xpath = require('xpath')

var request = require("request");

request("http://xml.pinnaclesports.com/pinnacleFeed.aspx", function(error, response, body) {

var doc = new dom().parseFromString(body)
var homeTeam = ""
var AwayTeam = ""
var homeSpread = ""
var awaySpread = ""
var league = ""
var eventTime = ""
var events = xpath.select("pinnacle_line_feed/events/event", doc)
events.forEach(function(event){
	league = xpath.select("league", event)[0].firstChild.data
	eventTime =xpath.select("event_datetimeGMT", event)[0].firstChild.data
var participants = xpath.select("participants/participant", event)
	participants.forEach(function(participant){
		if (xpath.select("visiting_home_draw", participant)[0] != null) {
		if(xpath.select("visiting_home_draw", participant)[0].firstChild.data === "Home") {
			homeTeam = xpath.select("participant_name", participant)[0].firstChild.data
		}
		if (xpath.select("visiting_home_draw", participant)[0].firstChild.data === "Visiting"){
			awayTeam = xpath.select("participant_name", participant)[0].firstChild.data
		}
	}

	})
		if (xpath.select("periods/period/spread/spread_home", event)[0] != null) {
		homeSpread = xpath.select("periods/period/spread/spread_home", event)[0].firstChild.data
		awaySpread = xpath.select("periods/period/spread/spread_visiting", event)[0].firstChild.data
		console.log(league)
		console.log(eventTime)
		console.log(homeTeam)
		console.log(awayTeam)
		console.log(homeSpread)
		console.log(awaySpread)
	}
})

});
}, null, true, 'America/Los_Angeles');
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

