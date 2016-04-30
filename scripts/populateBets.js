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
  var companyNameArray = ["Say Cheez",
  "IHOP",
  "Qdoba",
  "Princeton Pi",
  "Panera",
  "Subway",
  "Domino's Pizza",
  "Buffalo Wild Wings"
  ]
  var companyPhotoArray = ["https://pbs.twimg.com/profile_images/426552803113574400/9ie-6ho7.jpeg",
  "https://pbs.twimg.com/profile_images/605213729677053953/oRZGvFQR.jpg",
  "https://www.qdoba.com/images/qdoba-logo-square.jpg",
  "http://s3.amazonaws.com/mypizza-logos/shops/1250/original/1250b.png",
  "http://www.brandsoftheworld.com/sites/default/files/styles/logo-thumbnail/public/042014/panera_bread_4c.png?itok=9LE5s_vl",
  "http://www.t3sub.com/wp-content/uploads/2014/09/Subway-Logo-Green-2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/2000px-Dominos_pizza_logo.svg.png",
  "http://www.foodpoisonjournal.com/files/2016/02/Buffalo-Wild-Wings1.jpg"

  ]
  var companyProductArray = ["Grilled Cheese",
   "Stack of Pancakes",
   "Burrito",
   "Slice of Pizza",
    "Bread Bowl",
    "Sub Sandwich",
    "Large Pizza",
    "Dozen Wings"
    ]
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

          if ((league == "NBA" || league == "MLB" || league == "Eng. Premier") && homeTeam.split(" ").length < 4 ) {
          var random = Math.floor(Math.random() * 8.0)
          fakeData.push({"teamOne": homeTeam,
          "photoOneURL": "https://deniselefay.files.wordpress.com/2011/01/number-1.png",
          "teamTwo": awayTeam,
          "photoTwoURL": "https://lh6.googleusercontent.com/-o5XaOSH6Y98/VCz-nAZ1lFI/AAAAAAAAAUw/W7F3Dal49ig/w600-h600/2.png",
          "vendor": companyNameArray[random], "vendorPhoto":companyPhotoArray[random],
          "odds": homeSpread,
          "percentage": Math.floor(Math.random() * 40.0),
          "product": companyProductArray[random],
          "eventTime": eventTime,
          "league": league,
          "userChosenTeam": ""
          })
        }
      }
  })
  console.log("ABOUT TO SAVE DATA")

  addBets(fakeData);
  console.log("SAVED THE DATA")

});
