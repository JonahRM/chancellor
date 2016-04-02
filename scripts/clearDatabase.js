var mongoose = require('mongoose');
var User = require('../app/models/user.js');
var Company = require('../app/models/company.js');
var Bet = require('../app/models/bet.js');
var configDB = require('../config/database.js');
mongoose.connect(configDB.url); // connect to our database
mongoose.set('debug', true);


function clearAllData() {
  User.remove({}, function(err) {
     console.log('All users removed');
     Company.remove({}, function(err) {
       console.log('All companies removed');
       Bet.remove({}, function(err) {
         console.log('All bets removed');
         mongoose.disconnect();
       });
     });
  });
}

clearAllData();
