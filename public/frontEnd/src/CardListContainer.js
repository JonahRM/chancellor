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

var userTakenBets = [

];


var CardListContainer = React.createClass({
  render: function() {
    console.log("Rendering CardListContainer", this.state.userAvailableBets.length);
    return (
      <div>
      <h2>Available Bets </h2>
      <CardList data = {this.state.userAvailableBets} handleDelete = {this.handleDelete} handleRemove = {this.handleRemove} isCurrent = {false}/>
      <h2>Current Bets </h2>
      <CardList data = {this.state.userTakenBets} handleDelete = {this.handleDelete} handleRemove = {this.handleRemove} isCurrent = {true} />

      </div>
    );
  },
  getInitialState: function() {
    return ({userAvailableBets: [], userTakenBets : userTakenBets});
  },
  componentDidMount: function() {
    $.ajax('/api/userAvailableBets').done(function(data) {
      this.setState({userAvailableBets: data});
    }.bind(this));
  },


  handleDelete: function(cardID) {
    // debugger;
    console.log("Removing Available Bet");

    var userTakenBetsModified = this.state.userTakenBets.slice();
    userTakenBetsModified.push(this.state.userAvailableBets.filter((i, _) => i.id == cardID)[0]);

    //debugger;

    var userAvailableBetsModified = this.state.userAvailableBets.slice();
    userAvailableBetsModified = userAvailableBetsModified.filter((i, _) => i.id !== cardID)
    this.setState({userAvailableBets: userAvailableBetsModified, userTakenBets: userTakenBetsModified});

  },

  handleRemove: function(cardID, isCurrent) {
    //debugger;
    console.log("Removing Current Bet");
    if(isCurrent){
    var userTakenBetsModified = this.state.userTakenBets.slice();
    userTakenBetsModified = userTakenBetsModified.filter((i, _) => i.id !== cardID)
    this.setState({userTakenBets: userTakenBetsModified});
  } else {
    var userAvailableBetsModified = this.state.userAvailableBets.slice();
    userAvailableBetsModified = userAvailableBetsModified.filter((i, _) => i.id !== cardID)
    this.setState({userAvailableBets: userAvailableBetsModified});

  }

  }

});

module.exports = CardListContainer;
