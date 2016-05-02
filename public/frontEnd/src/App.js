var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var $ = require('jquery');
var Link = require('react-router').Link;
var ListItem = require('material-ui/lib/lists/list-item');
var Marketplace2 = require('./Marketplace2');
var Profile = require('./Profile');
var Avatar = require('material-ui/lib/avatar');
var CurrentBets = require('./CurrentBets');

var AppBar = require('material-ui/lib/app-bar');
var MenuItem = require('material-ui/lib/menus/menu-item');
var Menu = require('material-ui/lib/menus/menu');
var LeftNav = require('material-ui/lib/left-nav');


/*
If no match for the route render nothing
*/
var NoMatch = React.createClass({
  render: function() {
    return (
      <h2>No match for the route</h2>
    );
  }
});

/*
Start Chancellor
*/
var App = React.createClass({
  getInitialState: function() {
    return {profile: [], cards: [],page:"/#/marketplace"};
  },
  /*
  Pull user profile and set data to profil
  */
  componentDidMount: function() {
    $.ajax('/api/profileJSON').done(function(data) {
      this.setState({profile: data});
    }.bind(this));
  },
  render: function() {
    /*
    Show Chancellor icon until profile picture is loaded
    */
    if(this.state.profile.user === undefined) {
      var logo = ( "images/chancellorLogo.ico");
    }
    else {
      var logo =  (this.state.profile.user.facebook.profilePictureURL);
    }

    /*
    Show profile, available bets and taken bets
    */
    return (
      <div>
      <div>
      <LeftNav width= {140}>
        <MenuItem linkButton={true} href="/#/profile" value="/#/profile"
        style={{verticalAlign: 'top',backgroundColor:(this.state.page==="/#/profile" ? "lightgray" : "transparent")}}
        onClick={ (function(e) {
        this.setState({page:"/#/profile"}) }).bind(this) } leftAvatar={(
          <Avatar src= {logo}  />
        )}>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Me
        </MenuItem>


        <MenuItem linkButton={true} href="/#/marketplace" value="/#/marketplace"
        style={{verticalAlign: 'top',backgroundColor:(this.state.page==="/#/marketplace" ? "lightgray" : "transparent")}}
        onClick={ (function(e) {
        this.setState({page:"/#/marketplace"}) }).bind(this) } >
        Marketplace
        </MenuItem>


          <MenuItem linkButton={true} href="/#/currentBets" value="/#/currentBets"
          style={{verticalAlign: 'top',backgroundColor:(this.state.page==="/#/currentBets" ? "lightgray" : "transparent")}}
          onClick={ (function(e) {
          this.setState({page:"/#/currentBets"}) }).bind(this) } >
          My Deals
          </MenuItem>

          <MenuItem
          style={{verticalAlign: 'top'}}>
          Settings
          </MenuItem>


        </LeftNav>
            </div>
            <div id = "indent">
            <Router>
            <Route path="/marketplace" component={Marketplace2} />
            <Route path="/currentBets" component={CurrentBets} />
            <Route path="/profile" component={Profile} />
            <Redirect from="/" to="/marketplace" />
            <Route path="*" component={NoMatch} />
            </Router>
            </div>

            </div>
          )
        }
      });
      /*
      Render the App
      */
      ReactDOM.render(
        <App />,
        document.getElementById('main')
      );
