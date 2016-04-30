var mongoose = require('mongoose');
var Bet = require('../app/models/bet.js');

var configDB = require('../config/database.js');
mongoose.connect(configDB.url); // connect to our database
mongoose.set('debug', true);

function addBets(data) {
  var NUMBER_OF_BETS = data.length;
  var savedCount = 0;
  for (var i = 0; i < NUMBER_OF_BETS; i++) {
    var bet = new Bet(data[i]);
    bet.save(function (err, sb) {
      if (savedCount === NUMBER_OF_BETS - 1) {
        mongoose.disconnect();
      }
      console.log(savedCount)
      savedCount++;
    });
  }
}

var fakeData = [];

var request = require("request");
var xpath = require('xpath')
var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();


request("http://xml.pinnaclesports.com/pinnacleFeed.aspx", function(error, response, body) {

  var doc = parser.parseFromString(body, 'text/xml');
  var homeTeam = ""
  var AwayTeam = ""
  var homeSpread = ""
  var awaySpread = ""
  var league = ""
  var eventTime = ""
  var events = xpath.select("pinnacle_line_feed/events/event", doc)
  events.forEach(function(event){
      league = xpath.select("league", event)[0].firstChild.data
      if (league == "NBA" | league == "MLB" | league == "Eng. Premier") {
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


          fakeData.push({"teamOne": homeTeam,
          "photoOneURL": "https://deniselefay.files.wordpress.com/2011/01/number-1.png",
          "teamTwo": awayTeam,
          "photoTwoURL": "https://lh6.googleusercontent.com/-o5XaOSH6Y98/VCz-nAZ1lFI/AAAAAAAAAUw/W7F3Dal49ig/w600-h600/2.png",
          "vendor": "Home Depot",
          "vendorPhoto":"https://www.bvscu.org/wp-content/uploads/2014/09/homedepot.jpg",
          "odds": homeSpread,
          "percentage": "50",
          "product": "Hammer",
          "eventTime": eventTime,
          "league": league})
      }
    }
  })
  console.log("ABOUT TO SAVE DATA")


  addBets(fakeData);
  console.log("SAVED THE DATA")

});
