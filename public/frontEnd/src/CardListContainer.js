var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Link = require('react-router').Link;

var CardList = require('./CardList');

var userTakenBets = [];

/*A CardListContainer handles the method functionality for deleting and adding cards to a CardList. It
also displays a CardList*/
var CardListContainer = React.createClass({
  /*Depending on the whether the cardlist is for available bets or current bets it will handle downstream logic differently */
  render: function() {
    console.log("Rendering CardListContainer", this.state.userAvailableBets.length);

    if (this.props.marketplace) {
      var display = (
        <div>
        <h2>Available Deals: </h2>
        <CardList data = {this.state.userAvailableBets} handleDelete = {this.handleDelete} handleRemove = {this.handleRemove} isCurrent = {false}/>
        </div>
      );
    } else {
      var display = (
        <div>
        <h2>Your Current Deals: </h2>
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
      console.log("This is available bets" + JSON.stringify(data, null, '\t'));
      this.setState({userAvailableBets: data});
    }.bind(this));
    $.ajax('/api/userTakenBets').done(function(data) {
      console.log("This is the taken data" + JSON.stringify(data, null, '\t'));
      this.setState({userTakenBets: data});
    }.bind(this));
  },

/*Once a user takes a bet handleDelete will take that bet out of the available bets and put it in the current bet*/
  handleDelete: function(cardID, userChosenTeam) {
    // debugger;
    console.log("Removing Available Bet");
    console.log("Chosen Team" + userChosenTeam);
    var self = this;
    var data = {
      betId : cardID,
      userChosenTeam : userChosenTeam
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
          self.setState({userAvailableBets: data});
        });
      }
    });


  },
/*If a user cancels a bet they've previously agreed to it will delete that bet from your currentBets and
place it back in your AvailableBets*/
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
  }

});

module.exports = CardListContainer;
