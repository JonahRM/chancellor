var mongoose = require('mongoose');

// define the schema for our user model
var betSchema = mongoose.Schema({
  teamOne: String,
  photoOneURL: String,
  teamTwo: String,
  photoTwoURL: String,
  vendor: String,
  vendorPhoto: String,
  odds: String,
  percentage: String,
  product: String
});

module.exports = mongoose.model('Bet', betSchema);
