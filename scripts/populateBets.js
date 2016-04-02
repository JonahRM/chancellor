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
      savedCount++;
    });
  }
}

var fakeData = [
  {teamOne: 'Patriots', photoOneURL: 'https://s-media-cache-ak0.pinimg.com/736x/b1/d8/b4/b1d8b4e9d1e1bcd1a5aabc492c7966e6.jpg', teamTwo:'Giants', photoTwoURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/New_York_Giants_logo.svg/2000px-New_York_Giants_logo.svg.png', vendor:'Dominos', vendorPhoto: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/2000px-Dominos_pizza_logo.svg.png', odds: 'Patriots by 3', percentage:'50%', product: 'Large Cheese Pizza'},
  {teamOne: 'Red Sox', photoOneURL: 'http://fullhdpictures.com/wp-content/uploads/2015/10/Boston-Red-Sox-Logos.jpg', teamTwo:'Yankees', photoTwoURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/25/NewYorkYankees_PrimaryLogo.svg/922px-NewYorkYankees_PrimaryLogo.svg.png', vendor:'Papa John\'s', vendorPhoto: 'http://www.milehighonthecheap.com/lotc-cms/wp-content/uploads/2013/07/papajohns-logo.jpg', odds: 'Red Sox by 2', percentage:'50%', product: 'Medium Pepperoni Pizza'},
  {teamOne: 'Bruins', photoOneURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Boston_Bruins.svg/1024px-Boston_Bruins.svg.png',teamTwo:'Devils', photoTwoURL: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/New_Jersey_Devils_logo.svg/1018px-New_Jersey_Devils_logo.svg.png', vendor:'Chipotle', vendorPhoto: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/1024px-Chipotle_Mexican_Grill_logo.svg.png', odds: 'Bruins by 1', percentage:'50%', product: 'Burrito or Bowl'},
  {teamOne: 'Celtics', photoOneURL: 'http://i.cdn.turner.com/nba/nba/teamsites/images/legacy/celtics/CelticsLogo_History.gif', teamTwo:'Knicks', photoTwoURL: 'http://content.sportslogos.net/logos/6/216/full/2nn48xofg0hms8k326cqdmuis.gif', vendor:'Target', vendorPhoto: 'http://abullseyeview.s3.amazonaws.com/wp-content/uploads/2014/04/targetlogo-6.jpeg', odds: 'Celtics by 8', percentage:'50%', product: '$20-$25 gift card'},
  {teamOne: 'Lauren B.', photoOneURL: 'http://lovelace-media.imgix.net/uploads/361/78c9d900-9de1-0133-399e-06e18a8a4ae5.jpg?w=684&h=513&fit=crop&crop=faces&auto=format&q=70', teamTwo:'Jojo', photoTwoURL: 'http://okhereisthesituation.com/wp-content/uploads/2015/10/Screen-Shot-2015-12-10-at-12.02.40-AM-620x360.png?1f2a44', vendor:'KFC', vendorPhoto: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png', odds: 'Lauren B. in 5 weeks', percentage:'50%', product: 'Chicken Bucket'}
];


addBets(fakeData);
