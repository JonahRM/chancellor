var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var CardList = require('./CardList');
//fetch data directly from node server

var fakeData = [
  {id: 1, teamOne: 'Bros', teamTwo:'SeaHawks', vendor:'Ven1', odds: 'Broncos by 3', percentage:'50%', product: 'Large Cheese Pizza'},
  {id: 2, teamOne: 'Bs', teamTwo:'SeaHaks', vendor:'Ven2', odds: 'Broncos by 3', percentage:'50%', product: 'pizza'},
  {id: 3, teamOne: 'Boncos', teamTwo:'SHawks', vendor:'Ven3', odds: 'Broncos by 3', percentage:'50%', product: 'pizza'},
  {id: 4, teamOne: 'Broncos', teamTwo:'Seawks', vendor:'Ven4', odds: 'Broncos by 3', percentage:'50%', product: 'pizza'},
  {id: 5, teamOne: 'Nets', teamTwo:'Knicks', vendor:'Ven5', odds: 'Knicks by 10', percentage:'50%', product: 'chicken'}
];

var currentBets = [

];


var CardListContainer = React.createClass({
  render: function() {
    console.log("Rendering CardListContainer", this.state.availableBets.length);
    return (
      <div>
      <h2>Available Bets </h2>
      <CardList data = {this.state.availableBets} handleDelete = {this.handleDelete} handleRemove = {this.handleRemove} isCurrent = {false}/>
      <h2>Current Bets </h2>
      <CardList data = {this.state.currentBets} handleDelete = {this.handleDelete} handleRemove = {this.handleRemove} isCurrent = {true} />

      </div>
    );
  },
  getInitialState: function() {
    return ({availableBets: [], currentBets : currentBets});
  },
  componentDidMount: function() {
    $.ajax('/api/currentBets').done(function(data) {
      this.setState({availableBets: data});
    }.bind(this));
  },


  handleDelete: function(cardID) {
    // debugger;
    console.log("Removing Available Bet");

    var currentBetsModified = this.state.currentBets.slice();
    currentBetsModified.push(this.state.availableBets.filter((i, _) => i.id == cardID)[0]);

    //debugger;

    var availableBetsModified = this.state.availableBets.slice();
    availableBetsModified = availableBetsModified.filter((i, _) => i.id !== cardID)
    this.setState({availableBets: availableBetsModified, currentBets: currentBetsModified});

  },

  handleRemove: function(cardID, isCurrent) {
    //debugger;
    console.log("Removing Current Bet");
    if(isCurrent){
    var currentBetsModified = this.state.currentBets.slice();
    currentBetsModified = currentBetsModified.filter((i, _) => i.id !== cardID)
    this.setState({currentBets: currentBetsModified});
  } else {
    var availableBetsModified = this.state.availableBets.slice();
    availableBetsModified = availableBetsModified.filter((i, _) => i.id !== cardID)
    this.setState({availableBets: availableBetsModified});

  }

  }

});

module.exports = CardListContainer;
