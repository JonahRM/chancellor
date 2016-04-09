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

    if (this.props.marketplace) {
      var display = (
        <div>
        <h2>Available Bets </h2>
        <CardList data = {this.state.userAvailableBets} handleDelete = {this.handleDelete} handleRemove = {this.handleRemove} isCurrent = {false}/>
        </div>
      );
    } else {
      var display = (
        <div>
        <h2>Current Bets </h2>
        <CardList data = {this.state.userTakenBets} handleDelete = {this.handleDelete} handleRemove = {this.handleRemove} isCurrent = {true} />
        </div>
      );
    }


    return (
      <div>
      {display}
      </div>
    );
  },
  getInitialState: function() {
    return ({userAvailableBets: [], userTakenBets : []});
  },
  componentDidMount: function() {
    $.ajax('/api/userAvailableBets').done(function(data) {
      console.log("This is the data" + JSON.stringify(data, null, '\t'));
      this.setState({userAvailableBets: data});
    }.bind(this));
    $.ajax('/api/userTakenBets').done(function(data) {
      console.log("This is the data" + JSON.stringify(data, null, '\t'));
      this.setState({userTakenBets: data});
    }.bind(this));
  },

//I've taken a bet I want
  handleDelete: function(cardID, userChosenTeam) {
    // debugger;
    console.log("Removing Available Bet");

    // var userTakenBetsModified = this.state.userTakenBets.slice();
    // userTakenBetsModified.push(this.state.userAvailableBets.filter((i, _) => i.id == cardID)[0]);
    //
    // //debugger;
    //
    // var userAvailableBetsModified = this.state.userAvailableBets.slice();
    // userAvailableBetsModified = userAvailableBetsModified.filter((i, _) => i.id !== cardID)
    // this.setState({userAvailableBets: userAvailableBetsModified, userTakenBets: userTakenBetsModified});
    //
    //
    var self = this;
    var data = {
      betId : cardID,
      chosenTeam : userChosenTeam
    }
    var baseURL = '/api/userTakenBets/add';
    $.ajax({
      type: 'POST',
      url: baseURL,
      data: data,
      error: function(e) {
        alert('This is the error ' + error);
      },
      success: function(response) {
        $.ajax('/api/userAvailableBets').done(function(data) {
          alert("This is the response " + JSON.stringify(data, null, '\t'));
          self.setState({userAvailableBets: data});
        });
      }
    });


  },

  handleRemove: function(cardID, isCurrent) {
    //debugger;
    console.log("Removing Current Bet");

    // I have taken a bet but changed my mind and want to delete it
    if(isCurrent){
      var self = this;
      var data = {
        betId : cardID
      }
      var baseURL = '/api/userTakenBets/cancel';
      $.ajax({
        type: 'POST',
        url: baseURL,
        data: data,
        error: function(e) {
          alert('This is the error ' + error);
        },
        success: function(response) {
          $.ajax('/api/userTakenBets').done(function(data) {
            alert("This is the response " + JSON.stringify(data, null, '\t'));
            self.setState({userTakenBets: data});
          });
        }
      });

  }
  else {
    var self = this;
    var data = {
      betId : cardID
    }
    var baseURL = '/api/userTakenBets/cancel';
    $.ajax({
      type: 'POST',
      url: baseURL,
      data: data,
      error: function(e) {
        alert('This is the error ' + error);
      },
      success: function(response) {
        $.ajax('/api/userTakenBets').done(function(data) {
          alert("This is the response " + JSON.stringify(data, null, '\t'));
          self.setState({userTakenBets: data});
        });
      }
    });

  }
  //^^I don't like an available bet and want it out of my feed

  }

});

module.exports = CardListContainer;
